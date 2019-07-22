import { apiRequest } from '../helper/apiClient';
import { getRedisKey, exSetRedisKey } from '../helper/cacheManager';

interface PhotoType {
  albumId: number,
  id: number,
  thumbnailUrl: string,
  title: string,
  url: string,
}

interface ResponseType {
  success: boolean,
  offset: number,
  limit: number,
  totalCount: number,
  data: Array<PhotoType>
}

async function getPhotosContent(req: any, res: any): Promise<void> {
  const refresh = req.query.refresh === 'true';
  const id = req.query.id;
  const offset = req.query.offset && !isNaN(req.query.offset) ? Number(req.query.offset) : 0;
  const limit = req.query.limit && !isNaN(req.query.limit) ? Number(req.query.limit) : 20;
  const key = `album-content-${id}`;
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
      dataContent = await apiRequest('get', `/photos?albumId=${id}`, {});
    }
    if (dataContent) {
      const startPos = offset > 0 ? offset - 1 : offset;
      const endPos = offset > 0 ? offset + limit - 1 : offset + limit;
      response.data = dataContent.slice(startPos, endPos);
      response.success = true;
      response.totalCount = dataContent.length;
      exSetRedisKey(key, JSON.stringify(dataContent), 86400);
      return res.send(response);
    }
    return res.send(response);
  } catch (err) {
    console.log('fetch gallery content error ', err);
  }
}

export default getPhotosContent;
