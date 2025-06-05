import React, { useState } from 'react';
import { Wallet, Search, Menu } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
 

  return (
    <header className="py-6 px-4 sm:px-6 lg:px-8 border-b border-[hsl(240_10%_20%)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl font-bold mr-8">Mi<span className="text-[hsl(270_60%_60%)]">Market</span>NFT</h1>
          {/* Desktop Navigation */}
          
        </div>

    
      </div>
      
      
    </header>
  );
};

export default Header;
