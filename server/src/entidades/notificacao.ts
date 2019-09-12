export function notificacao(nome: string, nivel: string) {
    return {
        "notification": {
            "title": "Atenção!",
            "body": `${nome}s estão ${nivel} do nivel de umidade adequado`,
            "icon": "../assets/estufaIcon.png",
            "vibrate": [100, 50, 100],
            "data": {
                "dateOfArrival": Date.now(),
                "primaryKey": 1
            },
            "actions": [{
                "action": "explore",
                "title": "Go to the site"
            }]
        }
    }
};