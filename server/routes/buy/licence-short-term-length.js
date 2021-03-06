const handlers = {
  get: function (request, reply) {
    request.session.oldPrice = true;
    return reply.view('licence-short-term-length', {
      pageTitle: 'How long do you want your licence to last?',
      errorMessage: 'Choose a licence length',
      items: {
          one: {
            text: '1 day',
            name: 'licence_length',
            id: '1-day',
          },
          two: {
            text: '8 days',
            name: 'licence_length',
            id: '8-days',
            value: '8-days',
            selectedText: '8-day licences are valid for 8 consecutive days',
          },
          three: {
            text: '12 months',
            name: 'licence_length',
            id: '365-days',
            value: '365-days',
            selectedText: 'A 12-month licence is not available for the start date you have selected. The start date will be updated to 1 April 2017.',
          },
      }
    })
  },
  post: function (request, reply) {
    request.session.licenceLength = request.payload.licence_length
    returnURL = request.query.returnUrl

    // Rods
      if (request.session.licenceType === 'Salmon and sea trout') {
        request.session.numberOfRods ='1 rod (or up to 3 rods for coarse fish)'
      } else if (request.session.licenceType === 'Trout and coarse') {
          request.session.numberOfRods = 'Up to 2 rods'
      }

    if (request.session.licenceLength === '365-days' && request.session.licenceType === 'Trout and coarse') {
      request.session.is365Contact = true;
      if (returnURL) {
        return reply.redirect('number-of-rods?returnUrl=/buy/summary')
      } else {
        return reply.redirect('number-of-rods')
      }
    } else if (request.session.licenceLength === '365-days') {
      request.session.is365Contact = true;
      request.session.startDate = "1 April 2017"
      if (returnURL) {
        return reply.redirect('disability?returnUrl=/buy/summary')
      } else {
        return reply.redirect('disability')
      }
    }
    //else if (request.session.haveTime === true){
    //   if (returnURL) {
    //     return reply.redirect(returnURL)
    //   } else {
    //     return reply.redirect('find-address')
    //   }
    // }
    else {
      if (returnURL) {
        return reply.redirect(returnURL)
      } else {
        if (request.session.haveTime === true) {
          return reply.redirect('find-address')
        } else {
          return reply.redirect('licence-start-time')
        }

      }
    }
  }
  }



  module.exports = [{
  method: 'GET',
  path: '/buy/licence-short-term-length',
  config: {
    handler: handlers.get
  }
  },
  {
  method: 'POST',
  path: '/buy/licence-short-term-length',
  config: {
    handler: handlers.post
  }
  }]
