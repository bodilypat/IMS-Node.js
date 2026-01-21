Full-Stack-Immigration-Management-System(IMS) 
│
├── backend (IMS Node.js)
│   ├── src/
│   │   ├── config/                          
│   │   │   ├── db.js
│   │   │   ├── env.js
│   │   │   └── multer.js
│   │   ├── controllers/                          
│   │   │   ├── auth.controller.js
│   │   │   ├── user.controller.js
│   │   │   ├── application.controller.js
│   │   │   ├── document.controller.js
│   │   │   └── appointment.controller.js
│   │   ├── routes/                          
│   │   │   ├── auth.routes.js
│   │   │   ├── user.routes.js
│   │   │   ├── application.routes.js
│   │   │   ├── document.routes.js
│   │   │   └── appointment.routes.js
│   │   ├── models/                          
│   │   │   ├── User.model.js
│   │   │   ├── role.model.js
│   │   │   ├── application.model.js
│   │   │   ├── document.model.js
│   │   │   └── appointment.model.js
│   │   ├── services/                          
│   │   │   ├── auth.service.js
│   │   │   ├── user.service.js
│   │   │   ├── application.service.js
│   │   │   └── notification.service.js
│   │   ├── middlewares/                          
│   │   │   ├── auth.middleware.js
│   │   │   ├── role.middleware.js
│   │   │   ├── error.middleware.js
│   │   │   └── validate.middleware.js
│   │   ├── utils/                          
│   │   │   ├── jwt.js
│   │   │   ├── hash.js
│   │   │   ├── response.js
│   │   │   └── constants.js
│   │   ├── validations/                          
│   │   │   ├── auth.validation.js
│   │   │   ├── application.validation.js
│   │   │   └── user.validation.js
│   │   ├── uploads/
│   │   │   └── documents/
│   │   ├── app.js
│   │   └── server.js                    
│   └── tests/
│       ├── auth.test.js
│       └── application.test.js
│
├── frontend (IMS React.js)
│                        
├── public/
│   └── index.html
├── src/
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   │   └── 
│   │   └── styles/
│   │       └── global.css
│   ├── components/
│   │   ├── components/
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Loader.jsx
│   │   │   └── Modal.jsx
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Footer.jsx
│   │   └── protected/
│   │       └── protectedRoute.jsx
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── applicant/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ApplyVisa.jsx
│   │   │   ├── TrackStatus.jsx
│   │   │   └── UploadDocument.jsx
│   │   ├── admin/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ReviewApplications.jsx
│   │   │   ├── Appointments.jsx
│   │   │   └── Reports.jsx
│   │   └── supperadmin/
│   │       ├── Dashboard.jsx
│   │       └── UserManagement.jsx
│   ├── routes/
│   │   └── AppRoutes.jsx
│   ├── services/
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── applicationService.js
│   │   └── userService.js
│   ├── store/
│   │   ├── index.js
│   │   ├── authSlice.js
│   │   └── applicationSlice.js
│   ├── hooks/
│   │   ├── authSlice.js
│   │   └── useFetch.js
│   ├── utils/
│   │   ├── constants.js
│   │   ├── validations.js
│   │   └── helpers.js
│   ├── context/
│   │   └── applicationSlice.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .env
├── composer.json
└── README.md
