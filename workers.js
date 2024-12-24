addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// /**
//  * @param {Array} proxy
//  * @param {Array} rules
//  */
// async function modifyProxyFile(proxy, rules) {
//   if (proxy){
    
//   }
// }

async function handleRequest(request) {
  const { searchParams } = new URL(request.url)
  const token = await searchParams.get("token")
  const client = await searchParams.get("type")
  if (token !== null && client !== null) {
    const psw = await userinfo.get(token)
    const clientList = await rulefile.list()
    if (client == "clash") {
      const clash_proxy = await rulefile.get("clash_proxy")
      const clash_rules = await rulefile.get("clash_rules")
      res = clash_proxy.replaceAll("123456789", psw) + clash_rules
    } else if (client == "surge"){
      const value = await rulefile.get(client)
      res = value.replaceAll("123456789", psw)
    } else if (client == "quanx") {
      const value = await rulefile.get("quan_proxy")
      res = value.replaceAll("123456789", psw)
    } else if (client == "v2raya") {
      const value = await rulefile.get("v2raya")
      res = value.replaceAll("123456789", psw)
    }
    return new Response(res, {status: 200, headers: {"Content-Disposition": 'inline; filename=CololiCloud'}})
  }
  return new Response('403 Forbidden', {status: 403})
}
