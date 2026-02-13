Full-Stack-Inventory-Management-System(IMS)
├── backend(Node.js)
│   ├── src/
│   │   ├── app.js                          
│   │   ├── server.js
│   │   │
│   │   ├── config/                             
│   │   │   ├── db.js
│   │   │   ├── env.js
│   │   │   └── index.js
│   │   │
│   │   ├── controllers/                                
│   │   │   ├── auth/
│   │   │   │   ├── auth.controller.js
│   │   │   │   └── session.controller.js                    
│   │   │   ├── user/
│   │   │   │   ├── user.controller.js
│   │   │   │   ├── role.controller.js
│   │   │   │   └── permission.controller.js
│   │   │   ├── masters/
│   │   │   │   ├── product.controller.js
│   │   │   │   ├── category.controller.js
│   │   │   │   └── supplier.controller.js
│   │   │   ├── inventory/
│   │   │   │   ├── stock.controller.js
│   │   │   │   ├── batch.controller.js
│   │   │   │   └── serial.controller.js
│   │   │   ├── purchasing/
│   │   │   │   ├── purchase.controller.js
│   │   │   │   ├── grn.controller.js
│   │   │   │   └── purchaseReturn.controller.js
│   │   │   ├── sales/
│   │   │   │   ├── sales.controller.js
│   │   │   │   └── saleReturn.controller.js
│   │   │   ├── analytics/
│   │   │   │   ├── salesAnalytics.controller.js
│   │   │   │   ├── inventoryAnalytics.controller.js
│   │   │   │   └── profitAnalytics.controller.js
│   │   │   └── audit/
│   │   │       ├── report.controller.js
│   │   │       ├── dashboard.controller.js
│   │   │       └── activityLog.controller.js   
│   │   │   
│   │   ├── services/                                       # Business Logic
│   │   │   ├── auth/
│   │   │   │   ├── auth.service.js
│   │   │   │   └── session.service.js                      
│   │   │   ├── users/
│   │   │   │   ├── user.service.js
│   │   │   │   ├── role.service.js
│   │   │   │   └── permission.service.js
│   │   │   ├── masters/
│   │   │   │   ├── product.service.js                       
│   │   │   │   ├── category.service.js                      
│   │   │   │   └── supplier.service.js    
│   │   │   ├── inventorys/             
│   │   │   │   ├── stock.service.js                         
│   │   │   │   ├── batch.service.js                        
│   │   │   │   └── serial.service.js                                   
│   │   │   ├── purchasing/
│   │   │   │   ├── purchase.service.js                      
│   │   │   │   ├── grn.service.js                           
│   │   │   │   └── purchaseReturn.service.js
│   │   │   ├── sales/
│   │   │   │   ├── sales.service.js                         
│   │   │   │   └── saleReturn.service.js
│   │   │   ├── analytics/
│   │   │   │   ├── salesAnalytics.sevice.js
│   │   │   │   ├── inventorAnalytics.service.js
│   │   │   │   └── financeAnalytics.service.js
│   │   │   └── audit/
│   │   │       ├── report.service.js
│   │   │       ├── dashboard.service.js
│   │   │       └── activityLog.service.js                         
│   │   ├── models/                                           
│   │   │   ├── auth/
│   │   │   │   └── session.model.js                          
│   │   │   ├── user/
│   │   │   │   ├── user.model.js
│   │   │   │   ├── role.model.js
│   │   │   │   └── permission.model.js
│   │   │   ├── inventorys/                    
│   │   │   │   ├── stock.model.js                         
│   │   │   │   ├── batch.model.js                         
│   │   │   │   └── serial.model.js                        
│   │   │   ├── purchasing/
│   │   │   │   ├── purchase.model.js                      
│   │   │   │   ├── grn.model.js                           
│   │   │   │   └── purchaseReturn.model.js
│   │   │   ├── sales/
│   │   │   │   ├── sales.model.js                         
│   │   │   │   └── saleReturn.model.js
│   │   │   ├── audit/
│   │   │   │   └── activityLog.model.js
│   │   │   └── index.js
│   │   ├── routes/                                           
│   │   │   ├── auth/
│   │   │   │   └── auth.routes.js                          
│   │   │   ├── user/
│   │   │   │   ├── user.routes.js
│   │   │   │   ├── role.routes.js
│   │   │   │   └── permission.routes.js
│   │   │   ├── inventory/                    
│   │   │   │   ├── stock.routes.js                         
│   │   │   │   ├── batch.routes.js                         
│   │   │   │   └── serial.routes.js                        
│   │   │   ├── purchasing/
│   │   │   │   ├── purchase.routes.js                      
│   │   │   │   ├── grn.routes.js                           
│   │   │   │   └── purchaseReturn.routes.js
│   │   │   ├── sales/
│   │   │   │   ├── sales.routes.js                         
│   │   │   │   └── saleReturn.routes.js
│   │   │   ├── audit/
│   │   │   │   └── activityLog.routes.js
│   │   │   └── index.js
│   │   │       
│   │   ├── middleware/     
│   │   │   ├── auth.middleware.js                         
│   │   │   ├── permission.middleware.js                 
│   │   │   ├── validate.middleware.js
│   │   │   ├── error.middleware.js
│   │   │   ├── notFound.middleware.js
│   │   │   └── activity.middleware.js
│   │   │ 
│   │   ├── utils/                             
│   │   │   ├── jwt.js
│   │   │   ├── logger.js
│   │   │   └── constants.js                  
│   │   └── docs/    
│   │       └── api.md        
│   │                         
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── requirements.txt
│   ├── alembic.ini
│   └── README.md
│   
├── frontend/ (React • JavaScript • HTML • CSS) component -> pages -> hooks -> services -> routes -> utils -> App.jsx
│   │
│   ├── src/
│   │   ├── components/                                         # Reusable UI & composed components
│   │   │   ├── ui/                            
│   │   │   │   ├── ProductCard.jsx
│   │   │   │   ├── CategorySelect.jsx
│   │   │   │   ├── ProductImageUpload.jsx
│   │   │   │   ├── SupplierSelect.jsx                          # Dropdown selector for forms
│   │   │   │   ├── SupplierDetailsCard.jsx                     # Shows supplier info (Like ProductCard)
│   │   │   │   ├── StockBadge.jsx                              # Small visual indicator
│   │   │   │   ├── InvoicePreview.jsx                          # Preview invoice for a sale
│   │   │   │   ├── CustomerSelect.jsx                          # Dropdown to select customer
│   │   │   │   ├── SalesSummaryCard.jsx                        # Summary of total sales
│   │   │   │   ├── PurchaseSummaryCard.jsx                     # Summary of total purchase
│   │   │   │   └── ReportSummaryCard.jsx                       # Summary for any report
│   │   │   ├── forms/                            
│   │   │   │   ├── ProductForm.jsx                             # Add Product
│   │   │   │   ├── EditProductForm.jsx                         # Edit existing product
│   │   │   │   ├── SupplierForm.jsx                            # Add new supplier
│   │   │   │   ├── EditSupplierForm.jsx                        # Edit supplier
│   │   │   │   ├── StockInForm.jsx                             # Add stock table
│   │   │   │   ├── StockOutForm.jsx                            # Reduce stock / sales mistakes
│   │   │   │   ├── StockAdjustmentForm.jsx                     # Correct inventory misstakes
│   │   │   │   ├── SalesForm.jsx                               # Create a new sale
│   │   │   │   └── PurchaseForm.jsx                            # Create a new purchase
│   │   │   ├── tables/                            
│   │   │   │   ├── ProductTable.jsx                            # List of products
│   │   │   │   ├── ProductFilter.jsx                           # Search, filter, sort
│   │   │   │   ├── SupplierTable.jsx                           # List suppliers 
│   │   │   │   ├── SupplierFilter.jsx                          # Search / Filter purchases by supplier
│   │   │   │   ├── StockTable.jsx                              # List suppliers
│   │   │   │   ├── StockFilter.jsx                             # Search / filter products
│   │   │   │   ├── SalesTable.jsx                              # List of sales
│   │   │   │   ├── SalesFilter.jsx                             # Search / filter sales
│   │   │   │   ├── PurchaseReportTable                         # Purchase report table
│   │   │   │   ├── SalesReportTable.jsx                        # Sales report table
│   │   │   │   ├── PurchaseTable.jsx                           # Purchase report table
│   │   │   │   ├── InventoryReportTable.jsx                    # Inventory report table
│   │   │   │   └── ProfitLossTable.jsx                         # Profit & loss report table
│   │   │   ├── filters/                            
│   │   │   │   └── ReportFilter.jsx                            # Date range, type, or category filter
│   │   │   └── index.js
│   │   │
│   │   ├── pages/                                              # Route-level pages (feature grouped)
│   │   │   ├── auth/    
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Register.jsx
│   │   │   │   └── ResetPassword.jsx             
│   │   │   ├── Dashboard/
│   │   │   │   └── Dashboard.jsx
│   │   │   ├── products/
│   │   │   │   ├── ProductsList.jsx
│   │   │   │   ├── AddProduct.jsx
│   │   │   │   ├── EditProduct.jsx
│   │   │   │   └── ProductDetail.jsx
│   │   │   ├── stock/
│   │   │   │   ├── StockDashboard.jsx
│   │   │   │   ├── StockIn.jsx
│   │   │   │   ├── StockOut.jsx
│   │   │   │   ├── StockAdjustment.jsx
│   │   │   │   └── StockHistory.jsx
│   │   │   ├── sales/
│   │   │   │   ├── SalesList.jsx
│   │   │   │   ├── CreateSale.jsx
│   │   │   │   ├── SaleDetails.jsx
│   │   │   │   └── SalesReport.jsx
│   │   │   ├── purchases/
│   │   │   │   ├── purchaseList.jsx
│   │   │   │   ├── CreatePurchase.jsx
│   │   │   │   ├── PurchaseDetails.jsx
│   │   │   │   └── PurchaseReport.jsx
│   │   │   └── reports/
│   │   │       ├── ReportsDashboard.jsx
│   │   │       ├── SalesReport.jsx
│   │   │       ├── PurchaseReport.js
│   │   │       ├── InventoryReport.js
│   │   │       └── ProfitLossReport.js   
│   │   │      
│   │   ├── services/                                          # All backend API calls
│   │   │   ├── authService.js    
│   │   │   ├── productService.js     
│   │   │   ├── stockService.js            
│   │   │   ├── salesService.js
│   │   │   ├── purchaseService.js
│   │   │   └── reportService.js
│   │   ├── context/                                           # Global state management (auth, user data)
│   │   │   ├── AuthContext.jsx
│   │   │   ├── ProductContext.jsx
│   │   │   ├── SaleContext.jsx
│   │   │   ├── PurchaseContext.jsx
│   │   │   ├── StockContext.jsx 
│   │   │   └── ReportContext.jsx
│   │   ├── hooks/                                             # Custom reusable logic
│   │   │   ├── useAuth.js
│   │   │   ├── useProduct.js
│   │   │   ├── useSales.js
│   │   │   ├── usePurchase.js
│   │   │   ├── useStock.js 
│   │   │   └── useReports.js
│   │   ├── routes/                                            # React Router cofiguration
│   │   │   ├── productRoutes.js
│   │   │   ├── salesRoutes.js
│   │   │   ├── purchaseRoutes.js
│   │   │   ├── stockRoutes.js
│   │   │   └── reportRoutes.js
│   │   ├── utils/                                             # Helper function (formatting validation)
│   │   │   ├── tokenStorage.js
│   │   │   ├── validators.js
│   │   │   ├── permissions.js
│   │   │   └── constants.js
│   │   ├── App.jsx                       
│   │   └── main.jsx
│   └──                   
├── .env                                        
├── requirements.txt                            
├── docker-compose.json                         
└── README.md                                  