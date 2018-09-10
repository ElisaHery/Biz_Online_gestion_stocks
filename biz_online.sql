-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 10, 2018 at 10:55 AM
-- Server version: 5.6.38
-- PHP Version: 7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `biz_online`
--

-- --------------------------------------------------------

--
-- Table structure for table `produits`
--

CREATE TABLE `produits` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `id_marque` smallint(5) UNSIGNED DEFAULT NULL,
  `nom` varchar(50) NOT NULL,
  `prix` decimal(5,0) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `produits`
--

INSERT INTO `produits` (`id`, `id_marque`, `nom`, `prix`, `description`) VALUES
(1, 4, 'socquettes sport lot 6 noires', '15', 'lot de 6 paires noires'),
(2, 4, 'socquettes sport lot 6 blanches', '15', 'lot de 6 paires blanches'),
(3, 4, 'socquettes sport lot 6 rayees', '15', 'lot de 6 paires rayees'),
(23, 4, 'chaussettes grises', '6', 'chaussettes hautes 100% laine de lama'),
(24, 1, 'chaussettes grises', '6', 'chaussettes hautes 100% laine de lama'),
(25, 5, 'chaussettes grises', '6', 'chaussettes hautes 100% laine de lama'),
(26, 3, 'chaussettes grises', '6', 'chaussettes hautes 100% laine de lama'),
(27, 2, 'chaussettes grises', '6', 'chaussettes hautes 100% laine de lama'),
(28, 6, 'chaussettes grises', '6', 'chaussettes hautes 100% laine de lama'),
(29, 1, 'chaussettes grises', '6', 'chaussettes hautes 100% laine de lama'),
(30, 2, 'chaussettes grises', '6', 'chaussettes basses 100% laine de lama'),
(34, 1, 'chaussettes grises', '6', 'chaussettes hautes 100% laine de lama'),
(35, 1, 'chaussettes grises', '6', 'chaussettes hautes 100% laine de lama'),
(36, 1, 'chaussettes grises', '6', 'chaussettes hautes 100% laine de lama'),
(37, 1, 'chaussettes grises', '6', 'chaussettes hautes 100% laine de lama'),
(38, 3, 'chaussettes vertes', '14', 'chaussettes hautes 100% laine de lama'),
(41, 3, 'chaussettes bleues', '6', 'chaussettes hautes 100% laine de lama');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `produits`
--
ALTER TABLE `produits`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_marque` (`id_marque`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `produits`
--
ALTER TABLE `produits`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `produits`
--
ALTER TABLE `produits`
  ADD CONSTRAINT `fk_marque` FOREIGN KEY (`id_marque`) REFERENCES `marques` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
