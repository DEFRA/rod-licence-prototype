const handlers = {
  get: function (request, reply) {
    return reply.view('disability', {
      pageTitle: 'Do you receive any of the following benefits?',
      errorMessage: 'Tell us if you claim Disability Living Allowance or Personal Independence Payment',
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
    request.session.disabilityChecked = true
    request.session.hasNINumber = false
    request.session.hasBlueBadge = false
    request.session.hasDisabledConcession = false

    if (disability === 'no') {
      if (returnURL) {
        return reply.redirect('blue-badge-check?returnUrl=/buy/summary')
      } else {
        return reply.redirect('blue-badge-check')
        //return reply.redirect('find-address')
      }
    } else {
      if (returnURL) {
        return reply.redirect('ni-number?returnUrl=/buy/summary')
      } else {
        return reply.redirect('ni-number')
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
