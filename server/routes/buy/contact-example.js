
const handlers = {
  get: function (request, reply) {

    request.session.noContact = false

    return reply.view('contact-example', {
      pageTitle: 'How can we send you your licence details?',
      errorMessage: 'Tell us how you would like to receive your licence details?',
      email: request.session.email,
      mobile: request.session.mobile,
      is365Contact: request.session.is365Contact,
      isFull: request.session.isFull,
      isJunior: request.session.isJunior,
    })
  },
  post: function (request, reply) {
    request.session.email = request.payload.email
    request.session.mobile = request.payload.mobile

    if (!request.payload.email && !request.payload.mobile) {
        request.session.noContact = true
    }

    if (request.payload.email && request.payload.mobile) {
        request.session.hasBothContact = true
    }

    returnURL = request.query.returnUrl
    if (returnURL) {
      return reply.redirect(returnURL)
    } else {
      return reply.redirect('summary')
    }
  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/contact-example',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/contact-example',
  config: {
    handler: handlers.post
  }
}]
