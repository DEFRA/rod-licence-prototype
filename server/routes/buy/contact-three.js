
const handlers = {
  get: function (request, reply) {

    request.session.noContact = true

    return reply.view('contact-three', {
      pageTitle: 'How would you like to save your licence details?',
      email: request.session.email,
      mobile: request.session.mobile,
      noContact: request.session.noContact,
      hasBothContact: request.session.hasBothContact
    })
  },
  post: function (request, reply) {
      return reply.redirect('')
  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/contact-three',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/contact-three',
  config: {
    handler: handlers.post
  }
}]
