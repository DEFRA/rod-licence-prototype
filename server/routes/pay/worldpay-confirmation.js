const handlers = {
  get: function (request, reply) {
    return reply.view('worldpay-confirmation', {
      pageTitle: 'Check your new licence details',
    })
  },
  post: function (request, reply) {
    return reply.redirect('confirm-payment')
  }
}

module.exports = [{
  method: 'GET',
  path: '/pay/worldpay-confirmation',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/pay/worldpay-confirmation',
  config: {
    handler: handlers.post
  }
}]
