-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 19, 2024 at 01:14 PM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_bio`
--

-- --------------------------------------------------------

--
-- Table structure for table `biodata`
--

CREATE TABLE `biodata` (
  `id` varchar(36) NOT NULL,
  `profile` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '/assets/profile/user.png',
  `role` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'Mahasiswa',
  `nama` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'Nama Kamu',
  `deskripsi` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `jenis_kelamin` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'Laki-Laki',
  `tanggal_lahir` date DEFAULT '1990-08-02',
  `tempat_lahir` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'Bumi',
  `user_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `biodata`
--

INSERT INTO `biodata` (`id`, `profile`, `role`, `nama`, `deskripsi`, `jenis_kelamin`, `tanggal_lahir`, `tempat_lahir`, `user_id`) VALUES
('6acde199-933e-41fb-9513-dbbb6c085142', '', 'Dosen', 'Nama Kamu', NULL, 'Perempuan', '1990-08-02', 'Bumi', '990a0931-2b37-472d-98cd-4580b78b592a'),
('fd8bec0d-14b2-11ef-b148-e86a641494c6', '/assets/profile/f88afa6c-f76d-4489-8a32-04eb81ca6886-people.jpg', 'Mahasiwa', 'Bayu Setiawanss', 'Saya Mahasiswa UPNVJTsss', 'Laki-Laki', '2004-07-15', 'Lamongan', 'cbd6fba5-477a-470d-9a9b-b7772c7a4092');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` varchar(36) NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `username` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `username`, `password`) VALUES
('5fef94fa-d0a2-4eb8-905d-7c4d4130f1d5', 'kukubima@gmail.com', 'bayu', '$2b$10$NetMgToZlWJZQbBNFdNIheDKncRffeKKrUj0lMPXsr4oSS7B7Og6K'),
('990a0931-2b37-472d-98cd-4580b78b592a', 'kurius@gmail.com', 'kocak', '$2b$10$6zl6VdonypAVO7BZZFqxAOlKEjfX0aFZMnQDH8GbVcC.TEHoKf3Lq'),
('cbd6fba5-477a-470d-9a9b-b7772c7a4092', 'exmotion.id@gmail.com', 'admin', '$2b$10$5k2wuwUJtuKT0u4t/yJgUe9QMaIFbaIGsWY0bWJ4rzpt7VS4cEO52');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `biodata`
--
ALTER TABLE `biodata`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `biodata`
--
ALTER TABLE `biodata`
  ADD CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
