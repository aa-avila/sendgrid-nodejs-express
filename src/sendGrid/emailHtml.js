const htmlEmail = (name, lastname) => { 
    return (`
    <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>

        <body>
            <header>
                <h1>¡Email enviado exitosamente!</h1>
            </header>
            <main>
                <h3>Este mensaje fue enviado a traves de SendGrid desde la cuenta configurada en el proyecto.</h3>
                <p>Tu nombre y apellidos proporcionados son ${name} ${lastname}.</p>
            </main>
        </body>

        </html>
    `);
}


module.exports = htmlEmail;

