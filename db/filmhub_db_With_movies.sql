-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-07-2023 a las 23:51:56
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

CREATE DATABASE IF NOT EXISTS filmhub_db;
USE filmhub_db;

--
-- Base de datos: `filmhub_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','root') NOT NULL DEFAULT 'admin',
  `permissions` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `admins`
--

INSERT INTO `admins` (`id`, `username`, `password`, `role`, `permissions`) VALUES
(1, 'root', '$2b$10$zSJk7ych/Ruq/jNbiwz32O1YRBJ/K8TJiXkEO.h6qiwvmJuJuipIS', 'root', '{\"create\": true, \"edit\": true, \"delete\": true}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `genres`
--

CREATE TABLE `genres` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `genres`
--

INSERT INTO `genres` (`id`, `name`) VALUES
(1, 'Acción'),
(2, 'Aventura'),
(3, 'Animación'),
(4, 'Comedia'),
(5, 'Crimen'),
(6, 'Documental'),
(7, 'Drama'),
(8, 'Fantasía'),
(9, 'Historia'),
(10, 'Horror'),
(11, 'Misterio'),
(12, 'Musical'),
(13, 'Romance'),
(14, 'Ciencia ficción'),
(15, 'Guerra'),
(16, 'Biografía'),
(17, 'Deportes'),
(18, 'Familiar'),
(19, 'Fantasía épica'),
(20, 'Superhéroes'),
(21, 'Comedia romántica');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movies`
--

CREATE TABLE `movies` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `synopsis` text NOT NULL,
  `release_date` date NOT NULL,
  `actors` text NOT NULL,
  `directors` text NOT NULL,
  `franchise` varchar(255) NOT NULL,
  `rating` decimal(2,1) DEFAULT 0.0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `movies`
--

INSERT INTO `movies` (`id`, `title`, `image`, `synopsis`, `release_date`, `actors`, `directors`, `franchise`, `rating`) VALUES
(1, 'Vengadores: Endgame', '1688937115573-870877641-Avengers-endgame.jpg', 'Después de los eventos devastadores de \'Vengadores: Infinity War\', el universo está en ruinas debido a las acciones de Thanos. Con la ayuda de los aliados que quedaron, los Vengadores deberán reunirse una vez más para intentar deshacer sus acciones y restaurar el orden en el universo de una vez por todas, sin importar cuáles sean las consecuencias... Cuarta y última entrega de la saga \"Vengadores\".', '2019-03-26', 'Robert Downey Jr.,Chris Evans,Mark Ruffalo,Chris Hemsworth,Scarlett Johansson', 'Anthony Russo', 'Marvel Studios', '0.0'),
(2, 'Spider-Man: Cruzando el Multiverso', '1688937287344-36778395-Spider-Man.jpg', 'Miles Morales regresa para una aventura épica que transportará al amigable vecino de Brooklyn Spider-Man a través del Multiverso para unir fuerzas con Gwen Stacy y un nuevo equipo de Spider-People, y enfrentarse así a un villano mucho más poderoso que cualquier cosa que hayan conocido antes.', '2023-06-01', 'Shameik Moore,Hailee Steinfeld,Brian Tyree Henry,Luna Lauren Velez,Jake Johnson,Oscar Isaac', 'Joaquim Dos Santos', 'Marvel Entertainment', '0.0'),
(3, 'Fast & Furious X ', '1688937549880-271274873-Rapidos-y-Furiosos.jpg', 'Durante numerosas misiones más que imposibles, Dom Toretto y su familia han sido capaces de ser más listos, de tener más valor y de ir más rápido que cualquier enemigo que se cruzara con ellos. Pero ahora tendrán que enfrentarse al oponente más letal que jamás hayan conocido: Un terrible peligro que resurge del pasado, que se mueve por una sangrienta sed de venganza y que está dispuesto a destrozar a la familia y destruir para siempre todo lo que a Dom le importa.', '2023-05-18', 'Vin Diesel,Michelle Rodriguez,Tyrese Gibson,Ludacris,John Cena', 'Louis Leterrier', 'Universal Studios', '0.0'),
(4, 'Guardianes de la Galaxia: Volumen 3', '1688937725601-973289455-Guardianes_de_la_galaxia.jpg', 'Star-Lord, todavía recuperándose de la pérdida de Gamora, debe reunir a su equipo para defender el universo junto con la protección de uno de los suyos. Una misión que, si no se completa, podría llevar al final de los Guardianes tal como los conocemos.', '2023-05-05', 'Chris Pratt,Zoe Saldaña,Dave Bautista,Karen Gillan,Pom Klementieff', 'James Gunn', 'Marvel Studios', '0.0'),
(5, 'Insidious: La última llave', '1688937922384-592006227-insidious.jpg', 'En esta nueva película de terror original, en la que veremos de nuevo a Lin Shaye como la Doctora Elise Rainier, la brillante parapsicóloga se enfrenta a su más personal y aterradora caza hasta la fecha, que sucede en su antigua casa familiar. Notas de producción - Cuarta entrega de la saga \"Insidious\".', '2018-01-05', 'Lin Shaye,Leigh Whannell,Angus Sampson,Kirk Acevedo,Caitlin Gerard,Spencer Locke', 'Adam Robitel', 'Blumhouse Productions', '0.0'),
(6, 'John Wick 4', '1688938093666-134538329-John_Wick_4.jpg', 'John Wick descubre un camino para derrotar a la Alta Mesa. Pero para poder ganar su libertad, Wick deberá enfrentarse a un nuevo rival con poderosas alianzas en todo el mundo, capaz de convertir a viejos amigos en enemigos.', '2023-03-23', 'Keanu Reeves,Donnie Yen,Bill Skarsgård,Ian McShane', 'Chad Stahelski', 'Summit Entertainment', '0.0'),
(7, 'Súper Mario Bros. La película', '1688938312089-440893384-Super_mario_bros.jpg', 'Mientras trabajan en una avería subterránea, los fontaneros de Brooklyn, Mario y su hermano Luigi, viajan por una misteriosa tubería hasta un nuevo mundo mágico. Pero, cuando los hermanos se separan, Mario deberá emprender una épica misión para encontrar a Luigi.', '2023-04-05', 'Chris Pratt.Anya Taylor-Joy,Charlie Day,Jack Black,Keegan-Michael Key', 'Michael Jelenic,Aaron Horvath', 'Illumination', '0.0'),
(8, 'Transformers: El despertar de las bestias', '1688938456736-971545895-Transformers.jpg', 'La batalla en la Tierra ya no es solo entre Autobots y Decepticons... Maximals, Predacons y Terrorcons se unen a Transformers: Rise of the Beasts.', '2023-06-09', 'Anthony Ramos,Dominique Fishback,Peter Cullen,Ron Perlman,Peter Dinklage', 'Steven Caple Jr.', 'Skydance Productions', '0.0'),
(9, 'Elemental', '1688938639071-574111832-Elementals.jpg', 'En una ciudad donde los residentes del fuego, el agua, la tierra y el aire viven juntos, una joven apasionada y un chico que se deja llevar por la corriente descubrirán algo elemental: cuánto tienen en común.', '2023-06-15', 'Leah Lewis,Mamoudou Athie,Ronnie del Carmen,Shila Ommi  Cinder Lumen,Wendi McLendon-Covey', 'Peter Sohn', 'Walt Disney Animation Studios', '0.0'),
(10, 'Mortal Kombat Legends: La venganza de Scorpion', '1688938844954-16830376-Mortal_kombat.jpg', 'Basado en el popular videojuego creado por Ed Boon y John Tovias, Mortal Kombat Legends: Scorpion’s Revenge pone el foco en un torneo único que se celebra una vez por generación y en el que se enfrentan los campeones de distintos reinos. El ganador determinará el destino de la Tierra y de sus habitantes.', '2023-04-12', 'Patrick Seitz,Jordan Rodrigues,Jennifer Carpenter,Joel McHale', 'Ethan Spaulding', 'Warner Bros. Animation', '0.0'),
(11, 'Avatar: El sentido del agua', '1688939011388-936936673-Avatar.jpg', 'Ambientada más de una década después de los acontecimientos de la primera película, \'Avatar: The Way of Water\' empieza contando la historia de la familia Sully (Jake, Neytiri y sus hijos), los problemas que los persiguen, lo que tienen que hacer para mantenerse a salvo, las batallas que libran para seguir con vida y las tragedias que sufren.', '2022-12-15', 'Sam Worthington,Zoe Saldaña,Sigourney Weaver,Stephen Lang,Kate Winslet', 'James Cameron', '20th Century Studios', '0.0'),
(12, 'El Gato con Botas: El último deseo', '1688939155871-284009652-El_gato_con_botas.jpg', 'El Gato con Botas se embarca en un viaje épico para encontrar al mítico Último Deseo y recuperar sus nueve vidas', '2022-12-22', 'Antonio Banderas,Salma Hayek Pinault,Harvey Guillén,Wagner Moura,Florence Pugh', 'Joel Crawford', 'DreamWorks Animation', '0.0'),
(13, 'Sonic 2: La película', '1688939287151-847169459-Sonic.jpg', 'Después de establecerse en Green Hills, Sonic se muere por demostrar que tiene madera de auténtico héroe, pero Robotnik regresa con nuevo compañero Knuckles, en busca de una esmeralda que tiene el poder de destruir civilizaciones, pero Sonic no está solo, le ayudará Tails.', '2022-04-08', 'James Marsden,Ben Schwartz,Tika Sumpter,Natasha Rothwell', 'Jeff Fowler', 'Paramount Pictures', '0.0');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movies_genres`
--

CREATE TABLE `movies_genres` (
  `id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL,
  `genre_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `movies_genres`
--

INSERT INTO `movies_genres` (`id`, `movie_id`, `genre_id`) VALUES
(1, 1, 20),
(2, 2, 3),
(3, 3, 1),
(4, 4, 1),
(5, 5, 10),
(6, 6, 1),
(7, 7, 18),
(8, 8, 1),
(9, 9, 3),
(10, 10, 1),
(11, 11, 14),
(12, 12, 3),
(13, 13, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movies_reviews`
--

CREATE TABLE `movies_reviews` (
  `id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL,
  `review_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `rating` int(11) NOT NULL,
  `comment` text NOT NULL,
  `creation_date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tokens`
--

CREATE TABLE `tokens` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `token` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tokens`
--

INSERT INTO `tokens` (`id`, `user_id`, `token`) VALUES
(1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoicm9vdCIsInJvbGUiOiJhZG1pbiIsInBlcm1pc3Npb25zIjoie1wiY3JlYXRlXCI6IHRydWUsIFwiZWRpdFwiOiB0cnVlLCBcImRlbGV0ZVwiOiB0cnVlfSIsImlhdCI6MTY4ODkzNjM0MSwiZXhwIjoxNjg4OTM5OTQxfQ.6THABb854cbj3cePhuIuOyheBAWiPEnavpmnAtyGYPg'),
(2, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoicm9vdCIsInJvbGUiOiJyb290IiwicGVybWlzc2lvbnMiOiJ7XCJjcmVhdGVcIjogdHJ1ZSwgXCJlZGl0XCI6IHRydWUsIFwiZGVsZXRlXCI6IHRydWV9IiwiaWF0IjoxNjg4OTM2Nzc5LCJleHAiOjE2ODg5NDAzNzl9.WXeIG3BUrw3t0MWTmoNxZs82dflPWaeTQdKtcVroc-Y');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indices de la tabla `genres`
--
ALTER TABLE `genres`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `movies_genres`
--
ALTER TABLE `movies_genres`
  ADD PRIMARY KEY (`id`),
  ADD KEY `movie_id` (`movie_id`),
  ADD KEY `genre_id` (`genre_id`);

--
-- Indices de la tabla `movies_reviews`
--
ALTER TABLE `movies_reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `movie_id` (`movie_id`),
  ADD KEY `review_id` (`review_id`);

--
-- Indices de la tabla `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `token` (`token`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `genres`
--
ALTER TABLE `genres`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `movies`
--
ALTER TABLE `movies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `movies_genres`
--
ALTER TABLE `movies_genres`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `movies_reviews`
--
ALTER TABLE `movies_reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tokens`
--
ALTER TABLE `tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `movies_genres`
--
ALTER TABLE `movies_genres`
  ADD CONSTRAINT `movies_genres_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `movies_genres_ibfk_2` FOREIGN KEY (`genre_id`) REFERENCES `genres` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `movies_reviews`
--
ALTER TABLE `movies_reviews`
  ADD CONSTRAINT `movies_reviews_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `movies_reviews_ibfk_2` FOREIGN KEY (`review_id`) REFERENCES `reviews` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `tokens`
--
ALTER TABLE `tokens`
  ADD CONSTRAINT `tokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `admins` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
