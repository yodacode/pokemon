-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Client: 127.0.0.1
-- Généré le: Jeu 22 Novembre 2012 à 10:29
-- Version du serveur: 5.5.27-log
-- Version de PHP: 5.4.6

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données: `pokemon`
--

-- --------------------------------------------------------

--
-- Structure de la table `pokemons`
--

CREATE TABLE IF NOT EXISTS `pokemons` (
  `nom` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `img` varchar(255) NOT NULL,
  `xp` int(11) NOT NULL,
  `levelup` int(11) NOT NULL,
  `pv` int(11) NOT NULL,
  `currentpv` int(11) NOT NULL,
  `attack1` varchar(255) NOT NULL,
  `attack2` varchar(255) NOT NULL,
  `attack3` varchar(255) NOT NULL,
  `defense` int(11) NOT NULL,
  `attack` int(11) NOT NULL,
  `id_attack` int(11) NOT NULL,
  `id_stat` int(11) NOT NULL,
  `level` int(11) NOT NULL,
  `id_users` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `pokemons`
--

INSERT INTO `pokemons` (`nom`, `type`, `img`, `xp`, `levelup`, `pv`, `currentpv`, `attack1`, `attack2`, `attack3`, `defense`, `attack`, `id_attack`, `id_stat`, `level`, `id_users`) VALUES
('bulbizarre', 'plante', 'bulbizarre.png', 250, 392, 45, 45, 'charge', 'tranchHerbe', 'rugissement', 49, 49, 1, 1, 7, 678475131);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fb_id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `login` varchar(255) NOT NULL,
  `mdp` varchar(11) NOT NULL,
  `direction` varchar(255) NOT NULL,
  `positiony` int(11) NOT NULL,
  `positionx` int(11) NOT NULL,
  `map` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Contenu de la table `users`
--

INSERT INTO `users` (`id`, `fb_id`, `nom`, `prenom`, `login`, `mdp`, `direction`, `positiony`, `positionx`, `map`) VALUES
(1, 678475131, 'de Vaublanc', 'Benjamin', 'mewmew', 'abc123', 'down', 6, 5, 'city');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
