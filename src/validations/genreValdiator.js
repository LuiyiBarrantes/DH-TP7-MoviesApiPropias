const{check} = require('express-validator');

module.exports = 
    [check('name')
    .notEmpty()
    .withMessage("El campo 'name' es obligatorio"),
    //check('ranking')
    //.notEmpty()
    //.withMessage("El campo 'ranking' es obligatorio"),
    check('active')
    .notEmpty()
    .withMessage("El campo 'active' es obligatorio"),
]
