import { apiRequest } from '../helper/apiClient';
import { getRedisKey, exSetRedisKey } from '../helper/cacheManager';

interface PhotoType {
  albumId: number,
  id: number,
  thumbnailUrl: string,
  title: string,
  url: string,
}

interface PhotoDetailResponseType {
  success: boolean,
  data: Array<PhotoType>
}

async function getPhotoDetailContent(req: any, res: any): Promise<void> {
  const photoId = req.params.photoId && !isNaN(req.params.photoId) ? Number(req.params.photoId) : null;
  const refresh = req.query.refresh === 'true';
  const key = `photoDetail-content-${photoId}`;
  const response: PhotoDetailResponseType = {
    success: false,
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
      dataContent = await apiRequest('get', `/photos/${photoId}`, {});
    }
    if (dataContent) {
      response.data = dataContent;
      response.success = true;
      exSetRedisKey(key, JSON.stringify(dataContent), 86400);
      return res.send(response);
    }
    return res.send(response);
  } catch (err) {
    console.log('fetch photo detail content error ', err);
  }
}

export default getPhotoDetailContent;
