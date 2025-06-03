# 🖼️ NFT Marketplace

![NFT Marketplace](https://via.placeholder.com/1200x400?text=NFT+Marketplace)

Marketplace descentralizado de NFTs desarrollado como parte del Parcial 2 de la asignatura *Blockchain* en la FP-UNA. Permite conectar billeteras Web3, acuñar y vender NFTs, y realizar compras con ETH en la red de prueba **Ephemery**.

---

## 🎯 Objetivos

- Crear y administrar NFTs ERC-721 usando Solidity.
- Interactuar con contratos mediante `ethers.js` y `MetaMask`.
- Visualizar NFTs en billetera después de comprarlos.

---

## 📦 Características Principales

- ✅ Conexión con MetaMask
- ✅ Exploración y compra de NFTs
- ✅ Acuñar (mint) y listar NFTs en el marketplace
- ✅ Visualización en grilla
- ✅ Notificaciones interactivas (toast)
- ✅ Integración con red de prueba Ephemery
- ✅ Compatible con ERC-721A o OpenZeppelin

---

## 🛠️ Tecnologías Usadas

### Frontend
- **React 19**, **Vite**
- **Tailwind CSS**, **DaisyUI**
- **ethers.js**
- **react-hot-toast**
- **Lucide React**

### Backend / Blockchain
- **Solidity** con **OpenZeppelin**
- **Hardhat** (con configuración para Ephemery)
- **IPFS** para metadatos de NFTs

---

## ⚙️ Instalación y Configuración

### Prerrequisitos

- Node.js v18+
- MetaMask instalada
- ETH de prueba (obtenido de faucet)
- Variables de entorno:

```env
PRIVATE_KEY=tu_clave_privada
VITE_CONTRACT_ADDRESS=0x54bA0676f9E554c6072967d89D0f848cDaD2F394
VITE_RPC_URL=https://otter.bordel.wtf/erigon


### Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/nft-market.git
cd nft-market

2. **Instalar dependencias del frontend**
```bash
cd frontend
npm install

3. **Iniciar el servidor de desarrollo**
```bash
npm run dev


1. **Compilar contratos**
```bash
cd backend
npx hardhat compile

# Ejecutar tests
npx hardhat test

# Desplegar en red de prueba
npx hardhat run scripts/deploy.js --network ephemery