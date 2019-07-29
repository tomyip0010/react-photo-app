import { NextFunction, Request, Response } from 'express';
import { apiRequest } from '../helper/apiClient';
import { getRedisKey, exSetRedisKey } from '../helper/cacheManager';
import HttpException from '../helper/HttpException';

interface PhotoType {
  albumId: number,
  id: number,
  thumbnailUrl: string,
  title: string,
  url: string,
}

interface ErrorType {
  errorCode: number,
  errorMessage: string,
}

interface PhotoDetailResponseType {
  success: boolean,
  data?: Array<PhotoType>,
  error?: ErrorType,
}

async function getPhotoDetailContent(req: Request, res: Response, next: NextFunction) {
  const photoId = req.params.photoId && !isNaN(req.params.photoId) ? Number(req.params.photoId) : null;
  const refresh = req.query.refresh === 'true';
  const key = `photoDetail-content-${photoId}`;
  const response: PhotoDetailResponseType = {
    success: false,
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
      dataContent = await apiRequest('get', `/photos/${photoId}`, {});
    }
    if (dataContent) {
      response.data = dataContent;
      response.success = true;
      exSetRedisKey(key, JSON.stringify(dataContent), 86400);
      return res.send({ response });
    }
    return res.send({ response });
  } catch (err) {
    console.log('fetch photo detail content error ', err);
    let errorCode = 500;
    let errorMessages = 'Something went wrong!';
    if (err.response) {
      errorCode = err.response.status;
      errorMessages = err.response.statusText;
    }
    next(new HttpException(errorCode, errorMessages));
  }
}

export default getPhotoDetailContent;
