import styles from './Contact.module.css';
import React from 'react';

import { BsTelephoneFill } from 'react-icons/bs';
import { MdOutlineSchedule } from 'react-icons/md';
import { MdLocationOn } from 'react-icons/md';

import LeafLetMAp from '../components/Map/LeafLetMAp';

const Contacts = () => {
  return (
    <div className={`flex justify-between ${styles.mapmobile} relative `}>
      <LeafLetMAp className="absolute z-[{-9999}]" />

      <div
        className={`w-3/5 flex flex-col justify-between bg-slate-400 p-5 ${styles.contactmobile} `}
      >
        <h2 className="mx-auto ">Контакти</h2>
        <div className={`${styles.scheduleSocial} flex flex-col mx-auto gap-5`}>
          <div className="flex gap-3">
            <BsTelephoneFill className="text-5xl bg-yellow-300 p-1 rounded-lg" />
            :
            <div className="flex flex-col text-xl">
              <p>XXXXXXXXXXXX</p>
              <p> XXXXXXXXXXXX</p>
            </div>
          </div>
          <div className="flex gap-3">
            <MdLocationOn className="text-5xl bg-yellow-300 p-1 rounded-lg" />:
            <div className="flex flex-col text-xl">
              <p>Rapid Service</p>
              <p> Зоряна 29</p>
            </div>
          </div>

          <div className="flex gap-3">
            <MdOutlineSchedule className="text-5xl bg-yellow-300  p-1 rounded-lg" />
            :
            <div className="text-left text-xl">
              <div className="flex flex-col text-xl">
                <span>пн-пт</span>
                <span>09:00-18:00</span>
              </div>
              <div className="flex flex-col text-xl">
                <span>сб-нд</span>
                <span>Вихідний</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex mx-auto gap-10">
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook-f text-3xl "></i>
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram text-3xl"></i>
          </a>
          <a
            href="https://www.twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-twitter text-3xl"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
