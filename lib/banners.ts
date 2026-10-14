/** 전화번호가 박힌 블로그 배너. 원본 글 안 순번이며, 저장은 하되 갤러리에서는 뺍니다. */
export const bannerSortOrders: Record<string, readonly number[]> = {
  "223051143138": [1, 15],
  "223051139168": [1, 7],
  "223051132816": [1, 9],
  "223051136448": [1, 12],
  "223051129360": [1, 10],
};

export function isBannerSortOrder(blogId: string, sortOrder: number) {
  return bannerSortOrders[blogId]?.includes(sortOrder) ?? false;
}
