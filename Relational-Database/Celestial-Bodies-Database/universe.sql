--
-- PostgreSQL database dump
--

-- Dumped from database version 12.17 (Ubuntu 12.17-1.pgdg22.04+1)
-- Dumped by pg_dump version 12.17 (Ubuntu 12.17-1.pgdg22.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE universe;
--
-- Name: universe; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE universe WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE universe OWNER TO freecodecamp;

\connect universe

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: black_hole; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.black_hole (
    black_hole_id integer NOT NULL,
    name character varying(30) NOT NULL,
    age_in_millions_of_years integer,
    distance_from_earth integer,
    average_temperature numeric(10,1),
    description text
);


ALTER TABLE public.black_hole OWNER TO freecodecamp;

--
-- Name: black_hole_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.black_hole_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.black_hole_id_seq OWNER TO freecodecamp;

--
-- Name: black_hole_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.black_hole_id_seq OWNED BY public.black_hole.black_hole_id;


--
-- Name: galaxy; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.galaxy (
    galaxy_id integer NOT NULL,
    name character varying(30) NOT NULL,
    age_in_millions_of_years integer,
    distance_from_earth integer,
    average_temperature numeric(10,1),
    description text,
    has_life boolean
);


ALTER TABLE public.galaxy OWNER TO freecodecamp;

--
-- Name: galaxy_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.galaxy_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.galaxy_id_seq OWNER TO freecodecamp;

--
-- Name: galaxy_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.galaxy_id_seq OWNED BY public.galaxy.galaxy_id;


--
-- Name: moon; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.moon (
    moon_id integer NOT NULL,
    name character varying(30) NOT NULL,
    age_in_millions_of_years integer,
    distance_from_earth integer,
    average_temperature numeric(10,1),
    description text,
    planet_id integer
);


ALTER TABLE public.moon OWNER TO freecodecamp;

--
-- Name: moon_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.moon_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.moon_id_seq OWNER TO freecodecamp;

--
-- Name: moon_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.moon_id_seq OWNED BY public.moon.moon_id;


--
-- Name: planet; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.planet (
    planet_id integer NOT NULL,
    name character varying(30) NOT NULL,
    age_in_millions_of_years integer,
    distance_from_earth integer,
    average_temperature numeric(10,1),
    description text,
    is_spherical boolean,
    star_id integer
);


ALTER TABLE public.planet OWNER TO freecodecamp;

--
-- Name: planet_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.planet_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.planet_id_seq OWNER TO freecodecamp;

--
-- Name: planet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.planet_id_seq OWNED BY public.planet.planet_id;


--
-- Name: star; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.star (
    star_id integer NOT NULL,
    name character varying(30) NOT NULL,
    age_in_millions_of_years integer,
    distance_from_earth integer,
    average_temperature numeric(10,1),
    description text,
    galaxy_id integer
);


ALTER TABLE public.star OWNER TO freecodecamp;

--
-- Name: star_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.star_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.star_id_seq OWNER TO freecodecamp;

--
-- Name: star_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.star_id_seq OWNED BY public.star.star_id;


--
-- Name: black_hole black_hole_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.black_hole ALTER COLUMN black_hole_id SET DEFAULT nextval('public.black_hole_id_seq'::regclass);


--
-- Name: galaxy galaxy_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy ALTER COLUMN galaxy_id SET DEFAULT nextval('public.galaxy_id_seq'::regclass);


--
-- Name: moon moon_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon ALTER COLUMN moon_id SET DEFAULT nextval('public.moon_id_seq'::regclass);


--
-- Name: planet planet_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet ALTER COLUMN planet_id SET DEFAULT nextval('public.planet_id_seq'::regclass);


--
-- Name: star star_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star ALTER COLUMN star_id SET DEFAULT nextval('public.star_id_seq'::regclass);


--
-- Data for Name: black_hole; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.black_hole VALUES (1, 'Sagittarius A*', 26000, 26000, NULL, 'A supermassive black hole at the center of the Milky Way galaxy.');
INSERT INTO public.black_hole VALUES (2, 'Messier 87*', 55000, 55000, NULL, 'A supermassive black hole in the center of the galaxy Messier 87.');
INSERT INTO public.black_hole VALUES (3, 'Cygnus X-1', 60000, 6100, NULL, 'A famous black hole in the constellation Cygnus, the first discovered black hole candidate.');


--
-- Data for Name: galaxy; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.galaxy VALUES (1, 'Milky Way', 13600, 0, 2.7, 'Our home galaxy, containing the Solar System.', true);
INSERT INTO public.galaxy VALUES (2, 'Andromeda', 10000, 2537000, 2.5, 'The nearest spiral galaxy to the Milky Way and the largest galaxy in the Local Group.', false);
INSERT INTO public.galaxy VALUES (3, 'Sombrero', 9000, 29000000, 3.0, 'A bright galaxy known for its distinctive sombrero-like shape.', false);
INSERT INTO public.galaxy VALUES (4, 'Triangulum', 10000, 3000000, 2.6, 'A member of the Local Group, it is the third-largest galaxy after Andromeda and the Milky Way.', false);
INSERT INTO public.galaxy VALUES (5, 'Whirlpool', 4500, 23000000, 3.1, 'A classic spiral galaxy and one of the most famous galaxies in the night sky.', false);
INSERT INTO public.galaxy VALUES (6, 'Cartwheel', 500, 500000000, 2.8, 'A lenticular galaxy and ring galaxy showing a striking resemblance to a spoked cartwheel.', false);


--
-- Data for Name: moon; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.moon VALUES (1, 'Luna', 4500, 384000, -20.0, 'The Earth''s only natural satellite.', 3);
INSERT INTO public.moon VALUES (2, 'Phobos', 4500, 9400, -60.0, 'The larger and closer of Mars''s two moons.', 4);
INSERT INTO public.moon VALUES (3, 'Deimos', 4500, 23460, -50.0, 'The smaller and outer of Mars''s two moons.', 4);
INSERT INTO public.moon VALUES (4, 'Io', 4500, 421700, -130.0, 'One of Jupiter''s four Galilean moons, known for its volcanic activity.', 5);
INSERT INTO public.moon VALUES (5, 'Europa', 4500, 671100, -160.0, 'One of Jupiter''s four Galilean moons, with a possible subsurface ocean.', 5);
INSERT INTO public.moon VALUES (6, 'Ganymede', 4500, 1070400, -150.0, 'The largest moon in the Solar System, orbiting Jupiter.', 5);
INSERT INTO public.moon VALUES (7, 'Callisto', 4500, 1882700, -140.0, 'One of Jupiter''s four Galilean moons, known for its heavily cratered surface.', 5);
INSERT INTO public.moon VALUES (8, 'Titan', 4500, 1221860, -180.0, 'The largest moon of Saturn, with a thick atmosphere.', 6);
INSERT INTO public.moon VALUES (9, 'Enceladus', 4500, 147910, -200.0, 'A small icy moon of Saturn, known for its geysers of water vapor and ice.', 6);
INSERT INTO public.moon VALUES (10, 'Mimas', 4500, 185520, -220.0, 'A small moon of Saturn, known for its large Herschel Crater.', 6);
INSERT INTO public.moon VALUES (11, 'Triton', 4500, 3548000, -235.0, 'The largest moon of Neptune, with a retrograde orbit and possible cryovolcanism.', 8);
INSERT INTO public.moon VALUES (12, 'Charon', 4500, 19571, -220.0, 'The largest moon of Pluto, part of a binary system with Pluto.', 1);
INSERT INTO public.moon VALUES (13, 'Phobetor', 4500, 4593, -180.0, 'A moon of Uranus, known for its varied terrain and unusual appearance.', 7);
INSERT INTO public.moon VALUES (14, 'Ariel', 4500, 190900, -210.0, 'One of the moons of Uranus, known for its relatively young surface.', 7);
INSERT INTO public.moon VALUES (15, 'Umbriel', 4500, 266000, -215.0, 'A moon of Uranus, known for its dark surface.', 7);
INSERT INTO public.moon VALUES (16, 'Miranda', 4500, 129900, -220.0, 'A small moon of Uranus, known for its varied terrain and unusual appearance.', 7);
INSERT INTO public.moon VALUES (17, 'Nereid', 4500, 5513400, -225.0, 'The third-largest moon of Neptune, known for its highly eccentric orbit.', 8);
INSERT INTO public.moon VALUES (18, 'Dione', 4500, 377400, -235.0, 'A moon of Saturn, known for its bright icy surface and wispy terrain.', 6);
INSERT INTO public.moon VALUES (19, 'Hyperion', 4500, 1481000, -240.0, 'An irregularly shaped moon of Saturn, known for its chaotic rotation.', 6);
INSERT INTO public.moon VALUES (20, 'Mercus', 4500, 3548000, -230.0, 'The largest moon of Neptune, with a retrograde orbit and possible cryovolcanism.', 8);


--
-- Data for Name: planet; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.planet VALUES (1, 'Mercury', 4500, 770000, 167.0, 'The smallest planet in our Solar System and closest to the Sun.', true, 1);
INSERT INTO public.planet VALUES (2, 'Venus', 4500, 421000, 464.0, 'The second planet from the Sun, with a thick atmosphere.', true, 1);
INSERT INTO public.planet VALUES (3, 'Earth', 4500, 0, 15.0, 'Our home planet, the third from the Sun.', true, 1);
INSERT INTO public.planet VALUES (4, 'Mars', 4500, 780000, -65.0, 'The fourth planet from the Sun, known as the Red Planet.', true, 1);
INSERT INTO public.planet VALUES (5, 'Jupiter', 4500, 6280000, -110.0, 'The largest planet in our Solar System.', true, 1);
INSERT INTO public.planet VALUES (6, 'Saturn', 4500, 12750000, -140.0, 'The sixth planet from the Sun, known for its rings.', true, 1);
INSERT INTO public.planet VALUES (7, 'Uranus', 4500, 27200000, -195.0, 'The seventh planet from the Sun, has a unique sideways rotation.', true, 1);
INSERT INTO public.planet VALUES (8, 'Neptune', 4500, 43500000, -200.0, 'The eighth and farthest known planet from the Sun.', true, 1);
INSERT INTO public.planet VALUES (9, 'Proxima b', 4600, 43730, -39.0, 'An exoplanet orbiting the star Proxima Centauri.', true, 5);
INSERT INTO public.planet VALUES (10, 'Alpha Centauri Bb', 4600, 43710, 150.0, 'An exoplanet orbiting Alpha Centauri B.', true, 2);
INSERT INTO public.planet VALUES (11, 'Betelgeuse b', 8500, 6426, -50.0, 'A planet orbiting the star Betelgeuse.', true, 3);
INSERT INTO public.planet VALUES (12, 'Rigel b', 8000, 8631, 320.0, 'A planet orbiting the star Rigel.', true, 6);


--
-- Data for Name: star; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.star VALUES (1, 'Sun', 4600, 0, 5778.0, 'The star at the center of our solar system.', 1);
INSERT INTO public.star VALUES (2, 'Alpha Centauri', 4600, 4370000, 5790.0, 'The closest star system to the Solar System.', 1);
INSERT INTO public.star VALUES (3, 'Betelgeuse', 8500, 642500, 3500.0, 'A red supergiant star in the constellation Orion.', 1);
INSERT INTO public.star VALUES (4, 'Sirius', 200, 86100, 9940.0, 'The brightest star in the night sky.', 1);
INSERT INTO public.star VALUES (5, 'Proxima Centauri', 4600, 4372000, 3042.0, 'The closest known star to the Sun.', 1);
INSERT INTO public.star VALUES (6, 'Rigel', 8000, 863000, 12100.0, 'A blue supergiant star in the constellation Orion.', 1);


--
-- Name: black_hole_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.black_hole_id_seq', 1, false);


--
-- Name: galaxy_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.galaxy_id_seq', 1, false);


--
-- Name: moon_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.moon_id_seq', 1, false);


--
-- Name: planet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.planet_id_seq', 1, false);


--
-- Name: star_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.star_id_seq', 1, false);


--
-- Name: black_hole black_hole_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.black_hole
    ADD CONSTRAINT black_hole_name_key UNIQUE (name);


--
-- Name: black_hole black_hole_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.black_hole
    ADD CONSTRAINT black_hole_pkey PRIMARY KEY (black_hole_id);


--
-- Name: galaxy galaxy_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_name_key UNIQUE (name);


--
-- Name: galaxy galaxy_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_pkey PRIMARY KEY (galaxy_id);


--
-- Name: moon moon_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_name_key UNIQUE (name);


--
-- Name: moon moon_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_pkey PRIMARY KEY (moon_id);


--
-- Name: planet planet_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_name_key UNIQUE (name);


--
-- Name: planet planet_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_pkey PRIMARY KEY (planet_id);


--
-- Name: star star_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_name_key UNIQUE (name);


--
-- Name: star star_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_pkey PRIMARY KEY (star_id);


--
-- Name: moon moon_star_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_star_id_fkey FOREIGN KEY (planet_id) REFERENCES public.planet(planet_id);


--
-- Name: planet planet_star_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_star_id_fkey FOREIGN KEY (star_id) REFERENCES public.star(star_id);


--
-- Name: star star_galaxy_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_galaxy_id_fkey FOREIGN KEY (galaxy_id) REFERENCES public.galaxy(galaxy_id);


--
-- PostgreSQL database dump complete
--

