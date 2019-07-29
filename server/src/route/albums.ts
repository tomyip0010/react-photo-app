import { Request, Response, NextFunction } from 'express';
import { apiRequest } from '../helper/apiClient';
import { getRedisKey, exSetRedisKey } from '../helper/cacheManager';
import HttpException from '../helper/HttpException';

interface AlbumsType {
  userId: number,
  id: number,
  title: string,
}

interface ResponseType {
  success: boolean,
  offset: number,
  limit: number,
  totalCount: number,
  data: Array<AlbumsType>
}

async function getAlbumContent(req: Request, res: Response, next: NextFunction) {
  const refresh = req.query.refresh === 'true';
  const offset = req.query.offset && !isNaN(req.query.offset) ? Number(req.query.offset) : 0;
  const limit = req.query.limit && !isNaN(req.query.limit) ? Number(req.query.limit) : 20;
  const key = 'albums-content';
  const response: ResponseType = {
    success: false,
    offset,
    limit,
    totalCount: 0,
    data: [],
  };

  try {
    let dataContent;
    if (!refresh) {
      const cachedContent = await getRedisKey(key);
      if (cachedContent) {
        console.log(`${key}, with content from cache `);
        dataContent = JSON.parse(cachedContent);
      }
    }
    if (refresh || !dataContent) {
      console.log(`${key}, without cahce, fetching from api`);
      dataContent = await apiRequest('get', '/albums', {});
    }
    if (dataContent) {
      const startPos = offset;
      const endPos = offset + limit;
      response.data = dataContent.slice(startPos, endPos);
      response.success = true;
      response.totalCount = dataContent.length;
      exSetRedisKey(key, JSON.stringify(dataContent), 86400);
      return res.send({ response });
    }
    return res.send({ response });
  } catch (err) {
    console.log('fetch albums content error ', err);
    let errorCode = 500;
    let errorMessages = 'Something went wrong!';
    if (err.response) {
      errorCode = err.response.status;
      errorMessages = err.response.statusText;
    }
    next(new HttpException(errorCode, errorMessages));
  }
}

export default getAlbumContent;
