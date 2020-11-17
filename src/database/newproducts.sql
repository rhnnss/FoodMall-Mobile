-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 17, 2020 at 10:07 AM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `foodmall`
--

-- --------------------------------------------------------

--
-- Table structure for table `newproducts`
--

CREATE TABLE `newproducts` (
  `id` int(11) NOT NULL,
  `background` varchar(250) NOT NULL,
  `icon` varchar(150) NOT NULL,
  `nama` varchar(150) NOT NULL,
  `harga` varchar(150) NOT NULL,
  `deskripsi` varchar(250) NOT NULL,
  `star` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `newproducts`
--

INSERT INTO `newproducts` (`id`, `background`, `icon`, `nama`, `harga`, `deskripsi`, `star`) VALUES
(1, 'https://i.imgur.com/d9kvguM.png', 'https://i.imgur.com/kRjQpZg.png', 'Egg and Cheese Muffin', '55500', 'Perpaduan scrambled egg dan keju gurih dalam setangkup English Muffin hangat. Tersedia dari jam 5-11 pagi.', '5'),
(2, 'https://i.imgur.com/d9kvguM.png', 'https://i.imgur.com/kRjQpZg.png', 'Chicken Muffin', '150000', 'Setangkup English muffin hangat dilapis saus mayonais dengan daging ayam olahan yang digoreng dengan sempurna. Tersedia dari jam 5-11 pagi.', '4'),
(6, 'https://i.imgur.com/d9kvguM.png', 'https://i.imgur.com/kRjQpZg.png', 'Sausage McMuffin with Egg', '39999', 'Perpaduan klasik english muffin, sosis ayam khas McDonald\'s, telur, dan selembar keju bernutrisi. Tersedia dari jam 5-11 pagi.', '5'),
(7, 'https://i.imgur.com/d9kvguM.png', 'https://i.imgur.com/kRjQpZg.png', 'Chicken Muffin with Egg', '45000', 'Setangkup English muffin hangat dilapisi dengan saus mayonais, daging ayam olahan yang digoreng sempurna, telur, dan keju. Tersedia dari jam 5-11 pagi.', '5'),
(11, 'https://i.imgur.com/d9kvguM.png', 'https://i.imgur.com/kRjQpZg.png', 'Big Breakfast', '89000', 'Perpaduan English Muffin panggang yang disajikan dengan sosis ayam gurih, renyahnya Hashbrown serta lembutnya scrambled egg. Tersedia dari jam 5-11 pagi.', '5'),
(31, 'https://i.imgur.com/d9kvguM.png', 'sdfsdf', 'Product Prototype 19', '56000', 'dfssdfsdf', '4');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `newproducts`
--
ALTER TABLE `newproducts`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `newproducts`
--
ALTER TABLE `newproducts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
