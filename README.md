# NFT Certificates Dapp

Este dapp foi desenvolvido usando **Next.js** e **Material-UI**. Ele permite que o dono do contrato mint certificados diretamente pela interface e visualize os certificados já emitidos. Também exibe as recompensas recebidas.

Este projeto é a interface do [NFT](https://github.com/dalloglio/nft-certificate.git) de emissão de certificados. Antes de seguir com esse projeto é necessário primeiro executar o contrato.

Para rodar a aplicação Next.js no frontend:

```bash
git clone https://github.com/dalloglio/nft-certificate-dapp.git
cd nft-certificate-dapp
npm install
npm run dev
```

Acesse no navegador o dapp em http://localhost:3000.

O Dapp ao ser executado irá solicitar que seja conectado à Metamask, bem como irá configurar a rede local do Hardhat à Metamask.

Para mintar um certificado para um aluno, acesse http://localhost:3000 e preencha o formulário com as informações do aluno.

### Features

- **Conectar metamask**: O usuário pode se conectar com sua carteira Metamask para ver seus certificados.
- **Emitir certificados**: Administrador pode emitir certificados diretamente pela interface.
- **Visualizar certificados**: Administrador pode visualizar certificados emitidos para os alunos.
- **Sistema de recompensas**: Recompensas automáticas são exibidas com base no número de certificados emitidos.
