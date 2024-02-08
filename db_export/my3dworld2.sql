-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Време на генериране: 21 ное 2023 в 14:05
-- Версия на сървъра: 10.4.28-MariaDB
-- Версия на PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данни: `my3dworld2`
--

-- --------------------------------------------------------

--
-- Структура на таблица `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(255) NOT NULL,
  `category_img` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Схема на данните от таблица `categories`
--

INSERT INTO `categories` (`category_id`, `category_name`, `category_img`) VALUES
(1, 'Арт', 'https://i.etsystatic.com/16037140/r/il/52d1d0/1317051232/il_1140xN.1317051232_fqix.jpg'),
(2, 'Персонални Подаръци', 'http://my3dworld.bg/wp-content/uploads/photo-gallery/Portret_ot_snimka.jpg'),
(3, 'Други', 'http://my3dworld.bg/wp-content/uploads/photo-gallery/Gerb_na_Bulgaria.jpg?bwg=1542132510');

-- --------------------------------------------------------

--
-- Структура на таблица `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `product_img` varchar(255) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Схема на данните от таблица `products`
--

INSERT INTO `products` (`product_id`, `product_name`, `description`, `price`, `product_img`, `category_id`) VALUES
(19, 'Българска роза', '3D Роза в рамка направена от дърво', 19.99, 'https://i.etsystatic.com/16037140/r/il/52d1d0/1317051232/il_794xN.1317051232_fqix.jpg', 1),
(20, 'Product 2', 'Description of Product 2', 29.99, 'http://my3dworld.bg/wp-content/uploads/photo-gallery/Vylk_dyrvorezba.jpg', 1),
(21, 'Product 3', 'Description of Product 3', 39.99, 'https://s13emagst.akamaized.net/products/35378/35377108/images/res_6def0d6879f615c3488c9414a4ee134b.jpg', 1),
(22, 'Product 4', 'Description of Product 4', 49.99, 'http://my3dworld.bg/wp-content/uploads/photo-gallery/Portret_ot_snimka.jpg', 2),
(23, 'Product 5', 'Description of Product 5', 59.99, 'http://my3dworld.bg/wp-content/uploads/photo-gallery/Snimka_dyrvorezba.jpg', 2),
(24, 'Product 6', 'Description of Product 6', 69.99, 'http://my3dworld.bg/wp-content/uploads/photo-gallery/3D_snimka_na_dyrvo.jpg?bwg=1542195159', 2),
(25, 'Product 7', 'Description of Product 7', 79.99, 'http://my3dworld.bg/wp-content/uploads/photo-gallery/Gerb_na_Bulgaria.jpg?bwg=1542132510', 3),
(29, 'Product 8', 'Description of Product 8', 99.99, 'http://my3dworld.bg/wp-content/uploads/photo-gallery/Stariq_grad_Plovdiv_dyrvorezba.jpg', 3),
(33, 'Product 9', 'Description of Product 9', 59.99, 'http://my3dworld.bg/wp-content/uploads/photo-gallery/Vasil_Levski_dyrvorezba.jpg', 3);

-- --------------------------------------------------------

--
-- Структура на таблица `rating`
--

CREATE TABLE `rating` (
  `rating_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `rating_value` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Схема на данните от таблица `rating`
--

INSERT INTO `rating` (`rating_id`, `user_id`, `product_id`, `rating_value`) VALUES
(1, 25, 19, 3),
(2, 7, 19, 5),
(6, 29, 19, 3),
(7, 30, 19, 5),
(8, 7, 25, 3);

-- --------------------------------------------------------

--
-- Структура на таблица `reviews`
--

CREATE TABLE `reviews` (
  `review_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `review_text` text DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Схема на данните от таблица `reviews`
--

INSERT INTO `reviews` (`review_id`, `user_id`, `product_id`, `review_text`, `timestamp`) VALUES
(2, 7, 19, 'test', '2023-09-17 13:56:48'),
(8, 29, 19, 'test\n', '2023-10-25 09:23:07'),
(9, 30, 19, 'test', '2023-10-25 16:44:12');

-- --------------------------------------------------------

--
-- Структура на таблица `roles`
--

CREATE TABLE `roles` (
  `role_id` int(11) NOT NULL,
  `role_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Схема на данните от таблица `roles`
--

INSERT INTO `roles` (`role_id`, `role_name`) VALUES
(1, 'Buyer'),
(2, 'Admin');

-- --------------------------------------------------------

--
-- Структура на таблица `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Схема на данните от таблица `users`
--

INSERT INTO `users` (`user_id`, `first_name`, `last_name`, `email`, `password_hash`, `role_id`) VALUES
(2, 'pencho', 'georgiev', 'pencho@abv.bg', '$2b$10$pGehwIiVEwQxy3ib5dMYJOBcJrBVi5wqom2wzIXsHw65pTCCIi43a', 1),
(6, 'asd12', 'asd12', 'asd12@abv.bg', '$2b$10$Fi4B8oAVXZ4VNHt4wMahd.uu8knUqUuSRgYzJo2gUAn/2DeiMU2Dy', 1),
(7, 'asd4', 'asd4', 'asd4@abv.bg', '$2b$10$yR1WBSScdfbnv/AYf3IvTejbZxbVwgUVcC3FMyVCqd2LlIP6pOHQC', 2),
(8, 'gosho1', 'gosho1', 'gosho1@abv.bg', '$2b$10$bBuQx1LTwCvwMbJc6/z3AuXY/41hAqOkj4L.KMWR57BoOYghhkBVW', 1),
(16, 'hristo', 'hristev', 'hristo@abv.bg', '$2b$10$o9yQpjd8eF9Hd6gVRdRh3OQDIgcgalg8YGuYoHIMAzT8JqmZ2jSd2', 1),
(17, 'Toni', 'Dobrinski', 'tdobrinski@abv.bg', '$2b$10$t4NxX5VinihoQL.8IKL6KOG.tdUQNVTXQWGw24JVhOO4VzL4ZRQSC', 2),
(19, 'Krasi', 'Dobrinski', 'krasi@abv.bg', '$2b$10$hvHvNki0Ryw8BjppE/d.F.7DsCeIAwt4hL/QZW/HWl4R4RPC10FGC', 1),
(20, 'niki', 'dobrinski', 'niki@abv.bg', '$2b$10$UClhTy0i4v4eDaPI01DnvOqQ/Tx3cMe2qHjlDauIXD8bl209jG1uu', 1),
(23, 'kasis', 'kasis', 'kasis@abv.bg', '$2b$10$k.9YP853oTb.S1GRrzKV/uAcIPwdfPZmdicuOaRFIyI.NDcSxb3ZW', 1),
(25, 'Sami', 'Dobrinski', 'sami@abv.bg', '$2b$10$S7vIeTNXV0p0TRT6AzX/BOuHpxdsEGt8/ddDZ0BAfJX/pNT8SPreW', 1),
(27, 'Petko', 'Petkov', 'petkopetkov@abv.bg', '$2b$10$a9MgnA075k6NX1pKalIQJuOY.1WpRNB/7xIAjkQ4aIkt1YIngkvsa', 1),
(29, 'Ivan', 'Dikolakov', 'ivandikolakov@abv.bg', '$2b$10$AtU2/BZT9W9SKp404hVXy.Y8CX97Juj.mD55T2QroT6yEvOwtRI3S', 1),
(30, 'Pencho', '', '', '$2b$10$3qHj4xiR7CmEX/JZN57T1.mhKrfmiXgY28fYIQDPatA/YA9zDgQ42', 1);

--
-- Indexes for dumped tables
--

--
-- Индекси за таблица `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Индекси за таблица `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `idx_product_name` (`product_name`),
  ADD KEY `fk_category` (`category_id`);

--
-- Индекси за таблица `rating`
--
ALTER TABLE `rating`
  ADD PRIMARY KEY (`rating_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Индекси за таблица `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`review_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Индекси за таблица `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`);

--
-- Индекси за таблица `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `fk_user_role` (`role_id`),
  ADD KEY `idx_user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `rating`
--
ALTER TABLE `rating`
  MODIFY `rating_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `review_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- Ограничения за дъмпнати таблици
--

--
-- Ограничения за таблица `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`);

--
-- Ограничения за таблица `rating`
--
ALTER TABLE `rating`
  ADD CONSTRAINT `rating_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `rating_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE;

--
-- Ограничения за таблица `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE;

--
-- Ограничения за таблица `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_user_role` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
