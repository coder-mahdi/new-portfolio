import React from 'react';
import { 
  FaReact, 
  FaJs, 
  FaHtml5, 
  FaCss3Alt, 
  FaNodeJs, 
  FaGitAlt, 
  FaDocker,
  FaPhp,
  FaWordpress,
  FaShopify,
  FaCode,
  FaImage,
  FaVideo,
  FaFileAlt,
  FaPalette,
  FaCamera
} from 'react-icons/fa';
import { 
  SiTypescript, 
  SiTailwindcss, 
  SiMongodb, 
  SiPostgresql, 
  SiKubernetes,
  SiLaravel,
  SiJquery,
  SiSass,
  SiWoo,
  SiMysql,
  SiGithub,
  SiFigma,
  SiHeadlessui,
  SiAdobexd,
  SiCanva,
  SiAdobeillustrator,
  SiAdobephotoshop,
  SiAdobepremierepro,
  SiAdobeindesign,
  SiAdobelightroom
} from 'react-icons/si';

const SkillIcon = ({ skill, skillName }) => {
  // Use either skill or skillName prop, with skill taking precedence
  const skillValue = skill || skillName;
  
  const getIcon = () => {
    if (!skillValue) return null;
    
    const skillLower = skillValue.toLowerCase();
    
    // Check for exact matches first
    switch (skillLower) {
      case 'react':
        return <FaReact />;
      case 'javascript':
      case 'js':
        return <FaJs />;
      case 'typescript':
      case 'ts':
        return <SiTypescript />;
      case 'html5':
      case 'html':
        return <FaHtml5 />;
      case 'css3':
      case 'css':
        return <FaCss3Alt />;
      case 'tailwind css':
      case 'tailwind':
        return <SiTailwindcss />;
      case 'node.js':
      case 'nodejs':
      case 'node':
        return <FaNodeJs />;
      case 'mongodb':
        return <SiMongodb />;
      case 'postgresql':
        return <SiPostgresql />;
      case 'git':
      case 'github':
        return <FaGitAlt />;
      case 'docker':
        return <FaDocker />;
      case 'kubernetes':
      case 'k8s':
        return <SiKubernetes />;
      case 'php':
        return <FaPhp />;
      case 'laravel':
        return <SiLaravel />;
      case 'jquery':
        return <SiJquery />;
      case 'wordpress':
        return <FaWordpress />;
      case 'sass':
      case 'scss':
        return <SiSass />;
      case 'woocommerce':
      case 'woo':
        return <SiWoo />;
      case 'shopify':
        return <FaShopify />;
      case 'headless cms':
      case 'headlesscms':
        return <SiHeadlessui />;
      case 'mysql':
        return <SiMysql />;
      case 'vs code':
      case 'vscode':
        return <FaCode />;
      case 'figma':
        return <SiFigma />;
      // Adobe Creative Suite
      case 'photoshop':
        return <SiAdobephotoshop />;
      case 'premiere pro':
      case 'premiere':
        return <SiAdobepremierepro />;
      case 'indesign':
        return <SiAdobeindesign />;
      case 'illustrator':
        return <SiAdobeillustrator />;
      case 'lightroom':
        return <SiAdobelightroom />;
      case 'adobe xd':
      case 'xd':
        return <SiAdobexd />;
      case 'canva':
        return <SiCanva />;
      default:
        // Check for partial matches
        if (skillLower.includes('react')) return <FaReact />;
        if (skillLower.includes('javascript') || skillLower.includes('js')) return <FaJs />;
        if (skillLower.includes('typescript') || skillLower.includes('ts')) return <SiTypescript />;
        if (skillLower.includes('html')) return <FaHtml5 />;
        if (skillLower.includes('css')) return <FaCss3Alt />;
        if (skillLower.includes('tailwind')) return <SiTailwindcss />;
        if (skillLower.includes('node')) return <FaNodeJs />;
        if (skillLower.includes('mongodb')) return <SiMongodb />;
        if (skillLower.includes('postgresql')) return <SiPostgresql />;
        if (skillLower.includes('git')) return <FaGitAlt />;
        if (skillLower.includes('docker')) return <FaDocker />;
        if (skillLower.includes('kubernetes') || skillLower.includes('k8s')) return <SiKubernetes />;
        if (skillLower.includes('php')) return <FaPhp />;
        if (skillLower.includes('laravel')) return <SiLaravel />;
        if (skillLower.includes('jquery')) return <SiJquery />;
        if (skillLower.includes('wordpress')) return <FaWordpress />;
        if (skillLower.includes('sass') || skillLower.includes('scss')) return <SiSass />;
        if (skillLower.includes('woocommerce') || skillLower.includes('woo')) return <SiWoo />;
        if (skillLower.includes('shopify')) return <FaShopify />;
        if (skillLower.includes('headless')) return <SiHeadlessui />;
        if (skillLower.includes('mysql')) return <SiMysql />;
        if (skillLower.includes('vs code') || skillLower.includes('vscode')) return <FaCode />;
        if (skillLower.includes('figma')) return <SiFigma />;
        // Adobe Creative Suite partial matches
        if (skillLower.includes('photoshop')) return <SiAdobephotoshop />;
        if (skillLower.includes('premiere')) return <SiAdobepremierepro />;
        if (skillLower.includes('indesign')) return <SiAdobeindesign />;
        if (skillLower.includes('illustrator')) return <SiAdobeillustrator />;
        if (skillLower.includes('lightroom')) return <SiAdobelightroom />;
        if (skillLower.includes('adobe xd') || skillLower.includes('xd')) return <SiAdobexd />;
        if (skillLower.includes('canva')) return <SiCanva />;
        
        // If no match found, return null
        return null;
    }
  };

  return (
    <div className="skill-icon">
      {getIcon()}
    </div>
  );
};

export default SkillIcon; 