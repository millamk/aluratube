import React, { useState } from "react";
import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";

function HomePage() {
  const [value, setValue] = useState('')

  return (
    <>
      <CSSReset />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <Menu searchValue={value} setSearchValue={setValue} />
        <Header bannerUrl={config.banner} />
        <Timeline searchValue={value} playlists={config.playlists}>
          Conteúdo
        </Timeline>
        <Favorites fav={config.favorites} />
      </div>
    </>
  );
}

export default HomePage;

const StyledHeader = styled.div`
  .user-img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .user-info {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    gap: 16px;
  }
`;

const StyleBanner = styled.div`
  .banner-img {
    height: 320px;
    width: 100%;
    object-fit: cover;
    object-position: 20% 15%;
  }
`;

function Header(props) {
  return (
    <StyledHeader>
      <StyleBanner>
        <img className="banner-img" src={props.bannerUrl} alt="" />
      </StyleBanner>
      <section className="user-info">
        <img
          className="user-img"
          src={`https://github.com/${config.github}.png`}
          alt=""
        />
        <div>
          <h2>{config.name}</h2>
          <p>{config.job}</p>
        </div>
      </section>
    </StyledHeader>
  );
}

function Timeline({ searchValue, ...props }) {
  const playlistNames = Object.keys(props.playlists);
  return (
    <StyledTimeline>
      {playlistNames.map(playlistName => {
        const videos = props.playlists[playlistName];
        return (
          <section key={playlistName}>
            <h2>{playlistName}</h2>
            <div>
              {videos.filter((video) => {
                const titleNormalized = video.title.toLowerCase();
                const searchValueNormalized = searchValue.toLowerCase();
                return titleNormalized.includes(searchValueNormalized)
              }).map(video => {
                return (
                  <a key={video.url} href={video.url}>
                    <img src={video.thumb} alt="" />
                    <span>{video.title}</span>
                  </a>
                );
              })}
            </div>
          </section>
        );
      })}
    </StyledTimeline>
  );
}

const StyledFavorites = styled.div`
  padding-left: 32px;
  h2 {
    font-size: 16px;
    margin-bottom: 16px;
    text-transform: capitalize;
  }
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  a {
    text-align: center;
  }
  .fav {
    display: flex;
    gap: 8px;
  }
  p {
    margin-top: 8px;
    font-size: 14px;
    color: black;
  }
`;

function Favorites(props) {
  return (
    <StyledFavorites>
      <section>
        <h2>AluraTubes Favoritos</h2>
        <div className="fav">
          {props.fav.users.map(user => {
            return (
              <a key={user.url} href={user.url}>
                <img src={`https://github.com/${user.github}.png`} alt="" />
                <p>@{user.github}</p>
              </a>
            );
          })}
        </div>
      </section>
    </StyledFavorites>
  );
}
