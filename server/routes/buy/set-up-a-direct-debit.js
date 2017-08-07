const handlers = {
  get: function (request, reply) {


    return reply.view('set-up-a-direct-debit', {
      pageTitle: 'Set up a Direct Debit',
      errorMessage: 'Enter the name of the account holder',
      errorMessageTwo: 'Enter the bank/building society account number',
      errorMessageThree: 'Enter the payment reference',
    })
  },
  post: function (request, reply) {
  request.session.directDebit = request.payload.direct_debit
  
    return reply.redirect('direct-debit-guarantee')  

  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/set-up-a-direct-debit',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/set-up-a-direct-debit',
  config: {
    handler: handlers.post
  }
}]
