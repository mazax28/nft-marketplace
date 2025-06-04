require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // 👈 Esto importa las variables de entorno

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28", // Versión alineada con tu contrato
  networks: {
    sepolia: {
      url: process.env.RPC_URL, // URL de Sepolia con Infura
      accounts: [process.env.PRIVATE_KEY], // Llave privada desde las variables de entorno
    },
  },
};
