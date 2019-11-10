-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 31, 2019 at 09:13 PM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.1.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tester`
--

-- --------------------------------------------------------

--
-- Table structure for table `car`
--

CREATE TABLE `car` (
  `id` int(11) NOT NULL,
  `model` varchar(255) COLLATE utf8_bin NOT NULL,
  `engine` varchar(255) COLLATE utf8_bin NOT NULL,
  `currentLocation` varchar(255) COLLATE utf8_bin NOT NULL,
  `numberOfDoors` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `car`
--

INSERT INTO `car` (`id`, `model`, `engine`, `currentLocation`, `numberOfDoors`) VALUES
(1, 'bmw', 'bmwEngine', 'bayrn Str', 4),
(3, 'ferrari', 'merEngine', 'tun', 4);

-- --------------------------------------------------------

--
-- Table structure for table `demanddetails`
--

CREATE TABLE `demanddetails` (
  `carId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `pickupEarliestTime` datetime DEFAULT NULL,
  `pickupLocation` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `dropoffLatestTie` datetime DEFAULT NULL,
  `dropoffLocation` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `demanddetails`
--

INSERT INTO `demanddetails` (`carId`, `userId`, `pickupEarliestTime`, `pickupLocation`, `dropoffLatestTie`, `dropoffLocation`) VALUES
(1, 1, '2019-05-17 00:00:00', 'bayrnst', '2019-05-30 00:00:00', 'wasserb'),
(3, 1, '2019-10-04 12:02:25', 'stut', '2019-11-04 12:02:25', 'ber');

-- --------------------------------------------------------

--
-- Table structure for table `infotainmentsystem`
--

CREATE TABLE `infotainmentsystem` (
  `id` int(11) NOT NULL,
  `featureName` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `featureValue` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `carId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `infotainmentsystem`
--

INSERT INTO `infotainmentsystem` (`id`, `featureName`, `featureValue`, `carId`) VALUES
(1, 'dvd', 'yes', 1),
(2, 'aircond', 'no', 1);

-- --------------------------------------------------------

--
-- Table structure for table `interiordesign`
--

CREATE TABLE `interiordesign` (
  `id` int(11) NOT NULL,
  `featureName` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `featureValue` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `carId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `interiordesign`
--

INSERT INTO `interiordesign` (`id`, `featureName`, `featureValue`, `carId`) VALUES
(1, 'seat', 'leather', 1),
(2, 'color', 'blue', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_bin NOT NULL,
  `gender` varchar(255) COLLATE utf8_bin NOT NULL,
  `age` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `gender`, `age`) VALUES
(1, 'elyes', 'male', 25);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `car`
--
ALTER TABLE `car`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `demanddetails`
--
ALTER TABLE `demanddetails`
  ADD KEY `userId` (`userId`),
  ADD KEY `carId` (`carId`);

--
-- Indexes for table `infotainmentsystem`
--
ALTER TABLE `infotainmentsystem`
  ADD PRIMARY KEY (`id`),
  ADD KEY `carId` (`carId`);

--
-- Indexes for table `interiordesign`
--
ALTER TABLE `interiordesign`
  ADD PRIMARY KEY (`id`),
  ADD KEY `carId` (`carId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `car`
--
ALTER TABLE `car`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `infotainmentsystem`
--
ALTER TABLE `infotainmentsystem`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `interiordesign`
--
ALTER TABLE `interiordesign`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `demanddetails`
--
ALTER TABLE `demanddetails`
  ADD CONSTRAINT `demanddetails_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `demanddetails_ibfk_2` FOREIGN KEY (`carId`) REFERENCES `car` (`id`);

--
-- Constraints for table `infotainmentsystem`
--
ALTER TABLE `infotainmentsystem`
  ADD CONSTRAINT `infotainmentsystem_ibfk_1` FOREIGN KEY (`carId`) REFERENCES `car` (`id`);

--
-- Constraints for table `interiordesign`
--
ALTER TABLE `interiordesign`
  ADD CONSTRAINT `interiordesign_ibfk_1` FOREIGN KEY (`carId`) REFERENCES `car` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
