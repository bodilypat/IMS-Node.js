Full-Stack-Immigration-Management-System(IMS) 
│
├── backend                                           #  Node.js (Express) API
│   ├── src/
│   │   ├── config/                                   
│   │   │   ├── db.js                                 # DB Connection
│   │   │   ├── env.js                                # Environment loader
│   │   │   ├── multer.config.js                      # File upload config
│   │   │   └── multer.js                             # Winston / Pino logger 
│   │   ├── controllers/                          
│   │   │   ├── auth.controller.js
│   │   │   ├── user.controller.js
│   │   │   ├── application.controller.js
│   │   │   ├── document.controller.js
│   │   │   └── appointment.controller.js
│   │   ├── routes/  
│   │   │   ├── index.js                              # Route aggregator                        
│   │   │   ├── auth.routes.js
│   │   │   ├── user.routes.js
│   │   │   ├── application.routes.js
│   │   │   ├── document.routes.js
│   │   │   └── appointment.routes.js
│   │   ├── models/                          
│   │   │   ├── User.model.js
│   │   │   ├── Role.model.js
│   │   │   ├── Application.model.js
│   │   │   ├── Document.model.js
│   │   │   └── Appointment.model.js
│   │   ├── services/                          
│   │   │   ├── auth.service.js
│   │   │   ├── user.service.js
│   │   │   ├── application.service.js
│   │   │   ├── document.service.js
│   │   │   ├── appointment.service.js
│   │   │   └── notification.service.js
│   │   ├── middlewares/                          
│   │   │   ├── auth.middleware.js
│   │   │   ├── role.middleware.js
│   │   │   ├── error.middleware.js
│   │   │   ├── validate.middleware.js
│   │   │   └── rateLimit.middleware.js
│   │   ├── validations/                          
│   │   │   ├── auth.validation.js
│   │   │   ├── user.validation.js
│   │   │   ├── application.validation.js
│   │   │   └── document.validation.js
│   │   ├── utils/                          
│   │   │   ├── jwt.util.js
│   │   │   ├── hash.util.js
│   │   │   ├── response.util.js
│   │   │   ├── constants.js
│   │   │   └── apiError.js
│   │   ├── uploads/
│   │   │   └── documents/
│   │   ├── app.js                                     # Express app config
│   │   └── server.js                                  # Server bootstrap
│   └── tests/
│       ├── auth.test.js
│       ├── application.test.js
│       └── user.test.js
│
├── frontend (IMS React.js)                            # React.js client
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   ├── icons/
│   │   │   └── styles/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Input.jsx
│   │   │   │   ├── Loader.jsx
│   │   │   │   └── Modal.jsx
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   └── Footer.jsx
│   │   │   └── protected/
│   │   │       └── ProtectedRoute.jsx
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   ├── applicant/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── ApplyVisa.jsx
│   │   │   │   ├── TrackStatus.jsx
│   │   │   │   └── UploadDocument.jsx
│   │   │   ├── admin/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── ReviewApplications.jsx
│   │   │   │   ├── Appointments.jsx
│   │   │   │   └── Reports.jsx
│   │   │   └── superadmin/
│   │   │       ├── Dashboard.jsx
│   │   │       └── UserManagement.jsx
│   │   ├── routes/
│   │   │   └── AppRoutes.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── auth.service.js
│   │   │   ├── Applicatiom.service.js
│   │   │   └── user.service.js
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   └── useFetch.js
│   │   ├── utils/
│   │   │   ├── constants.js
│   │   │   ├── validations.js
│   │   │   └── helpers.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css   
│   ├── package.json
│   └── README.md
│
├── .env
├── docker-composer.yml
└── README.md
