

export const urlMaker = (filters) => {
    let URL = '/notes/filter';
    URL += `?UserId=${filters.userId.userId}`;
    if (filters.isActive !== 'all') URL += `&isActive=${filters.isActive}`;
    if (filters.category!=='All' && filters.category!=='all') URL += `&category=${filters.category}`;
    if (filters.spage) URL += `&page=${filters.spage}`;
    if (filters.spageSize) URL += `&pageSize=${filters.spageSize}`;
    return URL
}