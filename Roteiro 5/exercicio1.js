const dono = {
    "proprietario": "Silvio Santos",
    "endereco": {
    "cep":'hacked, pay to recover',
    "logradouro": 'hacked, pay to recover',
    "complemento": 'hacked, pay to recover',
    "bairro": 'hacked, pay to recover',
    "localidade": 'hacked, pay to recover',
    "uf": '',
    "geo": {
    "lat": "-23.61919020307765",
    "lng": "-46.70793551534256"
    }
    }
    }

    const local = require('https')

    function getEndereco(cep){
        const url = `https://viacep.com.br/ws/${cep}/json/`;
        return new Promise((resolve, reject) => {
            local.get(url, res =>{
                let resultado = ''
                res.on('data' , dados => {
                    resultado += dados
                })

                res.on('end', () => {
                    try{
                        resolve(JSON.parse(resultado))
                    } catch(e) {
                        reject(e)
                    }
                })
            }).on('error', reject);
        })
    }
    (async() => {
        const novoEndereco = await getEndereco('05650000');
        dono.endereco = {...novoEndereco, geo: dono.endereco.geo};
        const resultado = `${dono.proprietario} - ${dono.endereco.cep} - ${dono.endereco.bairro}, ${dono.endereco.localidade} (${dono.endereco.geo.lat}, ${dono.endereco.geo.lng})`;
        console.log(resultado);
    })()
    