import React from 'react';
import { useState, useEffect, useRef } from 'react';
// import { useReducer } from 'react';

// import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThreeDots } from 'react-loader-spinner'

//mailgun
import formData from 'form-data';
import Mailgun from 'mailgun.js';

const mg = new Mailgun(formData);
const client = mg.client({username: 'api', key: process.env.REACT_APP_MAILGUN_API_KEY});

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Create a ref for the form element
  const formRef = useRef(null);

  // Display success or error message when it has changed
  useEffect(() => {
    if (successMessage === 'Message sent successfully!') {
      toast.success(successMessage);
      resetForm();
    } else if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [successMessage, errorMessage]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await client.messages.create(process.env.REACT_APP_DOMAIN, {
        from: `Ares Security Contact Form Submission <${email}>`,
        to: 'contact@aressecurity.co',
        subject: subject,
        // template: 'arescontact', 'v:name': name, 'v:email': email, 'v:message': message, 'v:subject': subject, 'h:X-Mailgun-Variables': JSON.stringify({name: name, email: email, message: message, subject: subject})
        text: `FROM: ${name}\nREPLY EMAIL: ${email}\n\nMESSAGE:\n${message}\n\n\n© 2023 Ares Security LLC`
      });

      console.log('RESPONSE', response);

      if (response.status === 200) {
        setSuccessMessage('Message sent successfully!');
      }
    } catch (error) {
      console.log(error);
      setErrorMessage('Failed to send message, please try again or email us directly at: contact@aressecurity.co');
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }

  const resetForm = () => {
    formRef.current.reset();
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <>
      <section id="contact" className="text-gray-400 bg-black body-font relative">
        <div className="container px-5 py-20 mx-auto flex sm:flex-nowrap flex-wrap">
          <div className="lg:w-2/3 md:w-1/2 bg-odgreen rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
            <iframe id="map" width="100%" height="100%" title="map" className="absolute inset-0" frameborder="0" marginheight="0" marginwidth="0" scrolling="no" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1589687.5626687733!2d-105.9444551171875!3d38.90435052382222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87134327f4199271%3A0xd2591dd0e6d83a81!2sAres%20Security%20LLC!5e0!3m2!1sen!2sus!4v1664942444750!5m2!1sen!2sus"/>
            <div className="bg-black relative flex flex-wrap py-6 rounded shadow-md">
              <div className="lg:w-1/2 px-6">
                <h2 className="title-font font-semibold text-white tracking-widest text-xs">SERVICE AREAS</h2>
                <p className="mt-1 text-white">- Denver <br />- Colorado Springs <br /> - Pueblo</p>
              </div>
              <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
                <h2 className="title-font font-semibold text-white tracking-widest text-xs">EMAIL</h2>
                <a href="mailto: contact@aressecurity.co" className="text-litegreen leading-relaxed sm:mx-auto md:mr-auto lg:mr-24">contact@aressecurity.co</a>
                <h2 className="title-font font-semibold text-white tracking-widest text-xs mt-4">PHONE</h2>
                <p className="leading-relaxed text-litegreen">719-696-3966</p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/3 md:w-1/2 flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
            <span className="block mb-2 text-3xl text-base text-white font-semibold">
              Contact Us
            </span>
            <h2
              className="
                  text-litegreen
                  mb-2
                  uppercase
                  font-bold
                  text-[32px]
                  sm:text-[40px]
                  lg:text-[36px]
                  xl:text-[40px]
                  "
            >
              HOW CAN WE HELP YOU?
            </h2>

              <form ref={formRef} onSubmit={handleSubmit}>
                <div className="relative mb-4">
                  <label htmlFor="name" className="leading-7 text-sm text-white">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full bg-white rounded border border-litegreen focus:border-odgreen focus:ring-2 focus:ring-litegreen text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                  />
                </div>
                <div className="relative mb-4">
                  <label htmlFor="email" className="leading-7 text-sm text-white">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full bg-white rounded border border-litegreen focus:border-odgreen focus:ring-2 focus:ring-litegreen text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </div>
                <div className="relative mb-4">
                  <label htmlFor="subject" className="leading-7 text-sm text-white">Subject</label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full bg-white rounded border border-litegreen focus:border-odgreen focus:ring-2 focus:ring-litegreen text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    value={subject}
                    onChange={(event) => setSubject(event.target.value)}
                    required
                  >
                    <option value="" disabled>What can we help you with?</option>
                    <option value="get-a-quote">Get A Quote</option>
                    <option value="general-inquiry">General Inquiry</option>
                    <option value="careers">Careers</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="relative mb-4">
                  <label htmlFor="message" className="leading-7 text-sm text-white">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    className="w-full bg-gray-800 rounded border border-litegreen focus:border-indigo-500 focus:ring-2 focus:ring-litegreen h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    required
                  />
                </div>
              {loading ? (
                <div className="mx-5">
                  <ThreeDots
                    height="52"
                    width="80"
                    radius="9"
                    color="#fff"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                  />
                </div>
              ) : (
                <>
                  <button className="text-white bg-odgreen border-0 py-3 px-10 lg:px-8 xl:px-10 focus:outline-none hover:bg-litegreen hover:text-black transition ease-in-out duration-300 rounded-lg text-lg">Send</button>
                </>
              )}
                <p className="text-xs text-white text-opacity-90 mt-3">© 2023 Ares Security LLC</p>
              </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
