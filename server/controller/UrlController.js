const { validatePostUrl, validateGetUrl } = require('../validator/UrlValidator');
const { generateUniqueId, validateRecord } = require('../methods/UrlMethods');
const { Url } = require('../model');
const { Logger } = require('../log/index');

 module.exports = {
     getUrl: async (req, res, next) => {
        
        try {
            let { data, error } = validateGetUrl(req.params);
            if (error) {
                res.status(400).send({ error: error});
                return ;
            }
            
            Logger.info(`Processing Request:: /api/url/${data.urlId}`);
            const url = await Url.getUrlById(data.urlId);
            [data, error] = validateRecord(url);

            if (error) {
                throw error;
            }

            res.send({ data: { url: data }})

        } catch (err) {
            Logger.error(`ERROR AT GETURL: ${JSON.stringify(err)}`);
            let status = err.error.statusCode || 500
            res.status(status).send(err)
        }
     },
     generateShortenUrl: async (req, res, next) => {
         try {
            let { data, error } = validatePostUrl(req.body);
            if (error) {
                res.status(400).send({ error: error});
                return ;
            }

            Logger.info(`Processing Request:: URL: /api/url/generate, URL: ${data.url}`);
    
            //  62[a-zA-z0-9] ^ 8 (Digits) = 218340 billion combinations 
            // There are approx 1.5 billion urls in the world on 9/11/2019
            // Collition rate is super low 
            // so we don't need to make an extra db call to check whether the generted urlId is already existed

            const urlId = generateUniqueId(8);
            
            await Url.createNewRecord(urlId, data.url, data.expire);

            res.send({ data: { urlId } });

         } catch (err) {
            Logger.error(`ERROR AT GETSHORTENURL: ${JSON.stringify(err)}`);
            let status = err.error.statusCode || 500
            res.status(status).send(err);
         }
     }
 }