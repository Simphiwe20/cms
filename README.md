# Claim Management System
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.10.

## Development server
Run `ng serve` to run the application. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Logs in
The is a default user, admin. Credntials are as follows.
    -> username(admin@cms.com) and password(admin123)

# Claims Management System requirement specifications
Users
	Applicant(Client)
    •	Register(Only clients are able to register as users of the systems)
    o	Allow only if the client exists in our database:
        •	Log In
        •	Update Infor
        •	Make a claim (Fill a form and upload supporting documents)
	Agent/Adjuster (Internal user)
    •	Log In
    •	Review claims
    •	Approve / Rejects claim
    •   Escalate(coming soon)
	Manager(Internal user)
    •	Log In
    •	Review claims
    •	Approve/ Reject If needed
	Admin
    •	Create add Internal user
    •   Upload a spredsheet to add internal users in bulk 
    •	Manage users

1. Introduction
    The Claims Management System is designed to streamline the process of managing insurance claims for insurance organizations. This system will allow users to submit claims, track claim status, and communicate with insurance agents efficiently.

2. Objectives
    • Provide a user-friendly interface for submitting and managing insurance claims.
    • Automate claim processing workflows to improve efficiency and reduce manual effort.
    • Enable users to track the status of their claims in real-time.
    • Facilitate communication between users and insurance agents regarding claim-related      inquiries and updates.

3. Scope
    The Claims Management System will cover the following functionalities: 
        -> User registration and authentication
        -> Claim submission and tracking
        -> Communication features for users and insurance agents
        -> Reporting and analytics for claims.

4. Functional Requirements
        4.1 User Management
            • Clients should be able to register for an account with their personal     information.
            • All users should be able to log in securely using their credentials.
            • All users should be able to update their profile information.
        4.2 Claim Submission
            • Users should be able to submit new insurance claims by providing relevant details such as claim type, incident date, description, and supporting documents.
            • Users should receive confirmation upon successful submission of a claim.
        4.3 Claim Tracking
            • Users should be able to view the status of their submitted claims in real-time.
            • Users should receive notifications and updates regarding any changes in claim status.
        4.4 Communication(Comming soon)
            • Users should be able to send messages and inquiries to insurance agents regarding their claims.
            • Insurance agents should be able to respond to user inquiries and provide updates on claim processing.
        4.5 Reporting and Analytics
            • The system should generate reports on claim processing metrics such as claim volume, processing time, and resolution rate.(Comming soon)
            • The system should provide analytics dashboards for all claims submitted and claim's statuses.

        5. Assumptions and Constraints
            • The system will be developed using the MEAN stack (MongoDB, Express.js, Angular, Node.js).
            • Integration with existing backend systems and databases may be required.
            • Compliance with regulatory requirements and data privacy laws must be ensured.

5. Tools
    5.1 VS Code
    5.2 MongoDB Atlas and Compass
    5.3. Postman
    
6. Languages used
    6.1 Angular(HTML5, CSS3 and JS)
    6.3 Node JS(Express.js)
