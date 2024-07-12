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

DROP DATABASE number_guess;
--
-- Name: number_guess; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE number_guess WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE number_guess OWNER TO freecodecamp;

\connect number_guess

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
-- Name: players; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.players (
    username character varying(50),
    games_played integer DEFAULT 0,
    best_game integer DEFAULT 0
);


ALTER TABLE public.players OWNER TO freecodecamp;

--
-- Data for Name: players; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.players VALUES ('user_1720794238182', 0, 0);
INSERT INTO public.players VALUES ('user_1720794238181', 0, 0);
INSERT INTO public.players VALUES ('user_1720794242185', 0, 0);
INSERT INTO public.players VALUES ('user_1720794242184', 0, 0);
INSERT INTO public.players VALUES ('user_1720794250531', 2, 336);
INSERT INTO public.players VALUES ('user_1720794376462', 2, 538);
INSERT INTO public.players VALUES ('user_1720794250532', 5, 114);
INSERT INTO public.players VALUES ('user_1720794376463', 5, 14);
INSERT INTO public.players VALUES ('user_1720794289797', 2, 561);
INSERT INTO public.players VALUES ('user_1720794289798', 5, 19);
INSERT INTO public.players VALUES ('user_1720794396872', 2, 180);
INSERT INTO public.players VALUES ('user_1720794396873', 5, 8);
INSERT INTO public.players VALUES ('user_1720794325338', 2, 742);
INSERT INTO public.players VALUES ('user_1720794325339', 5, 165);
INSERT INTO public.players VALUES ('user_1720794412236', 2, 456);
INSERT INTO public.players VALUES ('user_1720794346171', 2, 294);
INSERT INTO public.players VALUES ('user_1720794412237', 5, 38);
INSERT INTO public.players VALUES ('user_1720794346172', 5, 499);
INSERT INTO public.players VALUES ('user_1720794360535', 2, 240);
INSERT INTO public.players VALUES ('user_1720794427001', 2, 97);
INSERT INTO public.players VALUES ('user_1720794360536', 5, 144);
INSERT INTO public.players VALUES ('user_1720794427002', 5, 113);
INSERT INTO public.players VALUES ('user_1720794439509', 2, 381);
INSERT INTO public.players VALUES ('user_1720794439510', 5, 153);


--
-- PostgreSQL database dump complete
--

