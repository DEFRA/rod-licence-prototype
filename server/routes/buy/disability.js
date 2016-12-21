const handlers = {
  get: function (request, reply) {
    return reply.view('disability', {
      pageTitle: 'Does the licence holder receive any of the following benefits?',
      errorMessage: 'Tell us if you claim Disability Living Allowance, Personal Independence Payment or hold a Blue Badge',
      items: {
        one: {
          text: 'Yes',
          name: 'disability',
          id: 'yes',
        },
        two: {
          text: 'No',
          name: 'disability',
          id: 'no',
        },
      }
    })
  },
  post: function (request, reply) {
    var disability = request.payload.disability
    returnURL = request.query.returnUrl

    if (disability === 'no') {
      if (returnURL) {
        return reply.redirect(returnURL)
      } else {
        return reply.redirect('find-address')
      }
    } else {
      request.session.hasBlueBadge = true
      request.session.concession = true
      if (returnURL) {
        return reply.redirect('disability-proof?returnUrl=/buy/summary')
      } else {
        return reply.redirect('disability-proof')
      }
    }




  }
}


module.exports = [{
  method: 'GET',
  path: '/buy/disability',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/disability',
  config: {
    handler: handlers.post
  }
}]
