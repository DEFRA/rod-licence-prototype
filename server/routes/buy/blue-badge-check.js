const handlers = {
  get: function (request, reply) {
    return reply.view('blue-badge-check', {
      pageTitle: 'Do you have a Blue Badge?',
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
    request.session.hasNINumber = false
    request.session.hasBlueBadge = false
        request.session.concession = false
    if (disability === 'no') {
      if (returnURL) {
        return reply.redirect(returnURL)
      } else if (request.session.isUpgrade === true){
        return reply.redirect('summary')
      } else {
        return reply.redirect('licence-type')
      }
    } else {
      if (returnURL) {
        return reply.redirect('blue-badge?returnUrl=/buy/summary')
      } else {
        return reply.redirect('blue-badge')
      }
    }
  }
}






module.exports = [{
  method: 'GET',
  path: '/buy/blue-badge-check',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/blue-badge-check',
  config: {
    handler: handlers.post
  }
}]
