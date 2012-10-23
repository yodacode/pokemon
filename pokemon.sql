-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Client: localhost
-- Généré le: Ven 12 Octobre 2012 à 14:29
-- Version du serveur: 5.5.24-log
-- Version de PHP: 5.3.13

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données: `pokemondp`
--
CREATE DATABASE `pokemondp` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `pokemondp`;

-- --------------------------------------------------------

--
-- Structure de la table `attaque`
--

CREATE TABLE IF NOT EXISTS `attaque` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nomattaque` varchar(255) NOT NULL,
  `puissance` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=32 ;

--
-- Contenu de la table `attaque`
--

INSERT INTO `attaque` (`id`, `nomattaque`, `puissance`) VALUES
(3, 'Charge', 10),
(4, 'Flammeche', 15),
(7, 'Rugissement', 0),
(8, 'Griffe', 20),
(9, 'Vampigraine', 0),
(10, 'Fouet Lianes', 15),
(11, 'Mimi-Queue', 0),
(12, 'Ecume ', 20),
(13, 'Pistolet A O', 40),
(14, 'Morsure ', 60),
(15, 'Coud''Krane ', 90),
(16, 'Hydrocanon', 120),
(17, 'Lance-Flamme', 50),
(18, 'Incendie', 100),
(21, 'Tranch''Herbe', 70),
(22, 'Canon Graine ', 110),
(23, 'Jet De Sable', 0),
(24, 'Tornade', 30),
(25, 'Vive-Attaque', 40),
(26, 'Cyclone', 70),
(27, 'Ouragan', 120),
(28, 'Secretion', 0),
(29, 'Piqure', 20),
(30, 'Choc Mental ', 50),
(31, 'Puissance', 0);

-- --------------------------------------------------------

--
-- Structure de la table `pokemon`
--

CREATE TABLE IF NOT EXISTS `pokemon` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nompokemon` varchar(255) NOT NULL,
  `XP` int(11) NOT NULL,
  `PV` int(11) NOT NULL,
  `Attaque1` int(11) NOT NULL,
  `Attaque2` int(11) NOT NULL,
  `Attaque3` int(11) NOT NULL,
  `Attaque4` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Attaque3` (`Attaque3`),
  KEY `Attaque4` (`Attaque4`),
  KEY `Attaque1` (`Attaque1`),
  KEY `Attaque2` (`Attaque2`),
  KEY `Attaque2_2` (`Attaque2`),
  KEY `Attaque1_2` (`Attaque1`),
  KEY `Attaque2_3` (`Attaque2`),
  KEY `nompokemon` (`nompokemon`),
  KEY `nompokemon_2` (`nompokemon`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

--
-- Contenu de la table `pokemon`
--

INSERT INTO `pokemon` (`id`, `nompokemon`, `XP`, `PV`, `Attaque1`, `Attaque2`, `Attaque3`, `Attaque4`) VALUES
(1, 'Salamech', 0, 50, 3, 4, 7, 8),
(5, 'Bulbizarre', 0, 50, 3, 7, 9, 10),
(6, 'Carapuce', 0, 50, 3, 7, 11, 12),
(7, 'Roucool', 0, 50, 3, 23, 24, 25),
(8, 'Chenipan', 0, 50, 3, 26, 27, 28),
(9, 'Rattata', 0, 50, 3, 11, 25, 31);

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

CREATE TABLE IF NOT EXISTS `utilisateur` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Nom` varchar(255) NOT NULL,
  `NomPokemon` varchar(255) NOT NULL,
  `Victoire` int(11) NOT NULL,
  `Defaite` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `NomPokemon` (`NomPokemon`),
  KEY `NomPokemon_2` (`NomPokemon`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Contenu de la table `utilisateur`
--

INSERT INTO `utilisateur` (`ID`, `Nom`, `NomPokemon`, `Victoire`, `Defaite`) VALUES
(1, 'user', 'Salamech', 0, 0);

--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `pokemon`
--
ALTER TABLE `pokemon`
  ADD CONSTRAINT `pokemon_ibfk_5` FOREIGN KEY (`Attaque1`) REFERENCES `attaque` (`id`),
  ADD CONSTRAINT `pokemon_ibfk_6` FOREIGN KEY (`Attaque2`) REFERENCES `attaque` (`id`),
  ADD CONSTRAINT `pokemon_ibfk_7` FOREIGN KEY (`Attaque3`) REFERENCES `attaque` (`id`),
  ADD CONSTRAINT `pokemon_ibfk_8` FOREIGN KEY (`Attaque4`) REFERENCES `attaque` (`id`);

--
-- Contraintes pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD CONSTRAINT `utilisateur_ibfk_1` FOREIGN KEY (`NomPokemon`) REFERENCES `pokemon` (`nompokemon`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
