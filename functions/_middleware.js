// One address for the site: www.tonight.design redirects to tonight.design
export async function onRequest({ request, next }) {
  const url = new URL(request.url)
  if (url.hostname === 'www.tonight.design') {
    url.hostname = 'tonight.design'
    return Response.redirect(url.toString(), 301)
  }
  return next()
}
