import React from 'react'
import './About.css';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div className='about'>
        <h2>Sobre o Mini <span>Blog</span></h2>
        <p>
            Este projeto consiste em um blog feito com react no front-end e Firebase no back-end
        </p>
        <Link to="/posts/create" className='btn'>Criar Post</Link>
    </div>
  )
}

export default About