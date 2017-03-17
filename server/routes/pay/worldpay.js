const handlers = {
  get: function (request, reply) {
    return reply.view('worldpay', null, { layout: 'layout-worldpay' }, {
      //pageTitle: 'Check your new licence details',
    })
  },
  post: function (request, reply) {
    return reply.redirect('worldpay-confirmation')
  }
}

module.exports = [{
  method: 'GET',
  path: '/pay/worldpay',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/pay/worldpay',
  config: {
    handler: handlers.post
  }
}]
