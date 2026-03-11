import { Game, Team, Stadium } from './types';

const teams: Record<string, Team> = {
  lg: { id: 'lg', name: 'LG 트윈스', shortName: 'LG', sport: 'baseball' , logoUrl: 'https://i.namu.wiki/i/LoA0ZroRYN-YPAFpexdNtzpOSUSOeXarEB7j0VYrJfcUmiaMXgBAgwcQFF_f_oYG9YqjD-uxTLrPbpdYM_me9bjgXcKknewKkcXjIg5ByUHai3X0FQpJ3ToEQQwoUkv0Go_7YKI8qdBbRPHScmuTow.svg'},
  doosan: { id: 'doosan', name: '두산 베어스', shortName: '두산', sport: 'baseball' , logoUrl: 'https://i.namu.wiki/i/IVpN43DBlDGvxSnwALGcUIMdHJjRgivrAjV6SqSO7q8-atsaiiLVQ5lW7saCW3mcl5YaK2n41ZDqVV4gTwDKRaUoPOoRjq4KIqsXVmKahJtv2Y3woRCjlaTeHzIAVolNX1-0IyqrklwsjY5BJ0TpRw.svg'},
  kiwoom: { id: 'kiwoom', name: '키움 히어로즈', shortName: '키움', sport: 'baseball' , logoUrl: 'https://i.namu.wiki/i/q-THPUhA0WbkGPgdpLWV9cSBkJVKszjTPIz5jDfr1_V0q6nVvn4dYXDXFO48sTnEPjUMzGjk4UppBTllaVGJsTefY8NDNtDqgHHgxIs2ZIeKpsEpeoNf55dIDISEyzAbm4v-u0zR1dDTj_G3e2l0gA.svg'},
  ssg: { id: 'ssg', name: 'SSG 랜더스', shortName: 'SSG', sport: 'baseball' , logoUrl: 'https://i.namu.wiki/i/CNWmnRx0aRD54ckCuFx7zWEp_Mwh5ACCbsxzE0c9j6zlN-lQYIDnVpvWorZOH7HU1Gc3IOWNFfs85H1hl5yApHJNAUILus6H4DXqxTxB1NZt1u4-vBrpbGD9MXYtOFC9Hh4HJPyt__csWW3nS-k6Vw.svg'},
  hanwha: { id: 'hanwha', name: '한화 이글스', shortName: '한화', sport: 'baseball' , logoUrl: 'https://i.namu.wiki/i/SClxRdu23u7HAWnY1y7hX-ZW7P57UN07ApPX5ZVkd2NS6bl28dnJLx2aR1A3rndDTO3MJOcD1143JMjUCRXCaA.svg'},
  lotte: { id: 'lotte', name: '롯데 자이언츠', shortName: '롯데', sport: 'baseball' , logoUrl: 'https://i.namu.wiki/i/0-xM-7gO5Y0SX6yOQqY0mjCUcBIdGLnMoyj8940IE_Z4LRenD0AoKcBe535tYNyVFaE0xhBrOmAaC8yvHDSrKimRtr_kCDRHEQXPsFuzHgH8pEEEaRRl8kbi76fCbMBRh6oE0qMM6GHZmSGWmbz5IQ.svg'},
  samsung: { id: 'samsung', name: '삼성 라이온즈', shortName: '삼성', sport: 'baseball' , logoUrl: 'https://i.namu.wiki/i/H8oFAQ4UwXJKPKBeRCugv7CfWC9-hu8oMqI25ojFRfSomvZ4cJ3AfOs0RNf__XpgIdT5n3PGKicMqI23X0EWJ7CMfUsR_AMfKpypnJ4Fcwj4VQTIfbkGNBjuFAktvS1K9OkZU18VPgJGBg0-qczpag.svg'},
  kia: { id: 'kia', name: 'KIA 타이거즈', shortName: 'KIA', sport: 'baseball' , logoUrl: 'https://i.namu.wiki/i/r02h_UhZzYr7uf-x1LKOQ2oGH2Yu6Sme8n1cF8wUCesSFzoglMAXFWAMaGqxxTcslSYIQD6GWA8rXpH9ZypzTyyB_6cfw_7AamXFu9g9GtaSDzrgR4E0pBdrlAA7VCqYAIKw4ermcQugi74wLwmF2w.svg'},

  gangwon: { id: 'gangwon', name: '강원 FC', shortName: '강원', sport: 'football', logoUrl: 'https://i.namu.wiki/i/XCZWcSbLcDtYOVRYzaFTK50pVt4CGXFQxV6aMp-0hbHceF7ceUOJFrgquo90pAvklQmpncOVgbQoS-AUd_XKvhbpubEdqfzlT5wCedAf5dRnpyMPcXI-s2Y2nHowi5Vi5xF5ptzsm_q8yNWZvBXCIQ.svg' },
  gwangju: { id: 'gwangju', name: '광주 FC', shortName: '광주', sport: 'football', logoUrl: 'https://i.namu.wiki/i/JJpXR7ibmpBQfGYhE8M6_Yc_PDToVgD4glYnRgS1qvVFHEfM-RRERPdr4Wwnl2PDTxIY83hHKUTnwtXzB3BW-7RvZnw2OHPR504dRgkTGUJLa3ZXNMGYhrgAaqQ9fHV3LRrUzaCqd06PviqSKx20LQ.svg' },
  gimcheon: { id: 'gimcheon', name: '김천 상무 FC', shortName: '김천', sport: 'football', logoUrl: 'https://i.namu.wiki/i/Bg0v3uBh9nb-VfwueHOWs2Ly1O1ICjTVk7wbK58bcnYgKf_ieSmNcXwOiDyz_ubhpHG_dJnif1VPqra_bHXPlc6N-dWBPFy9gEdhcjrWf0xTV0IcE1Ym0GzkEYwZRlXvyGa4EX-KimpiVON_ECAgzQ.svg' },
  daejeonCitizen: { id: 'daejeonCitizen', name: '대전 하나 시티즌', shortName: '대전', sport: 'football', logoUrl: 'https://i.namu.wiki/i/6VxS3utwsU16tUJTOqFiAw_N8BfsffLSmi8SangreGSE3vI8dPPzGIB3bvMHLOpwWVd86ZiGny5GyMdqBiDH3UWSuv_JCUDFYXXXql9V_93wOpnuXE4WL-Orach-stWVVsyBm2tGa4k1EPnfPEp4ZQ.svg' },
  seoul: { id: 'seoul', name: 'FC 서울', shortName: '서울', sport: 'football' , logoUrl: 'https://i.namu.wiki/i/VmgqRM9ayeELO0nIpDKpDEPx1Jk_S3is6E6LDo4H4GTqqmuElEtOGC8wT0KPD2qnPpGCRlxBMKG7XbiDDOI28BHKTyjKEZbJwuc53J1bvsVlrla9YPWNoxnw0-fcv4vxtmSNmdhNvFHBwBTrFzvtfw.svg'},
  anyang: { id: 'anyang', name: 'FC 안양', shortName: '안양', sport: 'football' , logoUrl: 'https://i.namu.wiki/i/BGWu4VUEp4g9KcDx8kRvVok3_aSflcjUNSad00FcLbL7g--Pf3CAeZynH0cJh148dsusTbw3fS6LKBIwzgWGXZxLp_NsyF7wZ9yjbe1I1_BiVNYMXCqnVWvd7XhVtIvULPrtWuQqt8ZyjaQ6aJGUxA.svg'},
  ulsan: { id: 'ulsan', name: '울산 HD FC', shortName: '울산', sport: 'football' , logoUrl: 'https://i.namu.wiki/i/dwVIeRUVl4HJ8Utx8-4d-YkVI3FbIQnnet-J5psYZ81L-r53EP5LTlrCDnvf6Cf1RCClVAsvF2LkhnFZDR_yAEig0qlzuOTtQdhi_gV5_5BgLotBS6EVLDt_3UUA5CUUd8ksMiAdf3K5G_8ouB47hA.svg'},
  incheon: { id: 'incheon', name: '인천 유나이티드 FC', shortName: '인천', sport: 'football', logoUrl: 'https://i.namu.wiki/i/5JufeEf5e0hi5m5KY6OT-VDhQa1qqa9bAQRGcIMpWEul7skN-J-nukgAXrRXM4MKTb3Ut3mcoyTPtAky7tcG32gCU-VwnERO6h92vLBY16bJHoDGislm6qoVuQffKXVpBvYZ2CoVjwJTfHDV8LYD-w.svg' },
  jeonbuk: { id: 'jeonbuk', name: '전북 현대 모터스', shortName: '전북', sport: 'football' , logoUrl: 'https://i.namu.wiki/i/nuLjx064n4p_LUX_KZxBIJsrUj1z8ekqgCPNlm0OCZRCW8ZxYFdM1673Ys3sneo8QEuKr-KVUHDGKLaJcAExt903nDalXP9lVJpRn2YYcsHLajmYxhEDZB1DAzy_Dl9566EM4c07dCGu70kOW_N5xw.svg'},
  jeju: { id: 'jeju', name: '제주 SK FC', shortName: '제주', sport: 'football', logoUrl: 'https://i.namu.wiki/i/G7sb6j6RpdZAZS-RWgpW0Zi3teswt8fa10fm_OVbnyj7ByMrr6hDbRGQ0iCntUfyBBMH9-Hc4_cMvxxsRFlQ1iKZvd3s_4PCUlybSHv2pSUmog1PhHNECGtr4Ezxi-TBeBBorm6f-IvntRxmosTBgA.svg' },
  pohang: { id: 'pohang', name: '포항 스틸러스', shortName: '포항', sport: 'football' , logoUrl: 'https://i.namu.wiki/i/NqrVZ9440KjpGEDskxfkmh0LBJJePtP65-gNKScOn3Ks-n1ubO-h8mZAc1i-m1YbMHPbLI_FTM7xkWGW-UuVPihz-xNHB893ofuzGHwkONYEWBZrLPtnAwFc8Fji7XgJmYbRdHBEZUa-UMHc73xcuw.svg'},
  gyeongnam: { id: 'gyeongnam', name: '경남 FC', shortName: '경남', sport: 'football', logoUrl: 'https://i.namu.wiki/i/UT-yZnScnskH1GZRexdie07qkOw7REhFrNaiOvWoAsPHl6lhgbaIQO0MvEIcpp6wKyupw_Mu-dhQi21ZJ2o56dUTIuhvOa_uZ9317cmRK77tW2kfM82KcJTzp5uNCOvL8TC0dKSJAH0XUAywMtoFjA.svg' },
  gimpo: { id: 'gimpo', name: '김포 FC', shortName: '김포', sport: 'football', logoUrl: 'https://i.namu.wiki/i/b4UDWEe3ohKy6cR3EzLgVBnkLR8Zck9NSK-Pu-7EHqiiqseckKWyzqyTISL9fw4CpneoU1SN_iOOUx0ZABcWcL0_VQeRwMEqOMcmPLBt8dNY5uiJq1L36Im6qQn9IxnvYb-_jrDXZ0FNQiTT_cIJKQ.svg' },
  gimhae: { id: 'gimhae', name: '김해 FC 2008', shortName: '김해', sport: 'football', logoUrl: 'https://i.namu.wiki/i/PBCuRSYgl8dfQwoPxVT3NBGrFb4Simuuy1uTMBpf23ruxlcCis42caUE4kN4XzDGSuPO_RKDKQsoFJjR97jRlw.svg' },
  daegu: { id: 'daegu', name: '대구 FC', shortName: '대구', sport: 'football' , logoUrl: 'https://i.namu.wiki/i/lOZBNTll1TV8BZaeX7hIw4oYXlX16ve8O6JztiGxjbUgY6Dk2s6_TJs0rpvVoIdK6NRJYN6Fc9lLn17IIMsVOVJRyVNxxCfNvg72M2uVjefch-jKifRB-cs91cyaG8RrZbveZZUe9GNHBuwgcNQT4w.svg'},
  busan: { id: 'busan', name: '부산 아이파크', shortName: '부산', sport: 'football' , logoUrl: 'https://i.namu.wiki/i/hlv0xpKY7n4wvN1zmNOxAhXbp4pkgAXt4PZjN6h1EM9ofTb85QvWWmc3sUEIQiyQMlXyO5GcYp_x-lxuY0s_L6neXjStdOE0GQpQjPdoB4gFLAPBhit62KrbJ3RNdKTDBPEwbGroXXJVh8gPhqKWtg.svg'},
  seoulE: { id: 'seoulE', name: '서울 이랜드 FC', shortName: '서울E', sport: 'football' , logoUrl: 'https://i.namu.wiki/i/ST_z_OAviNZefvtkzqys25ML-vgkDT9-EhFVvdtuD1t2IQwwyuh2vdQptgirvyTuAdUYByGvZIkcYGsbXJ4J4Dp2nzm2CRhue0cynEEijqM7ButgQPaYScQodTdXwKbpkiBdWlrAiof9anPjl9gjvA.svg'},
  seongnam: { id: 'seongnam', name: '성남 FC', shortName: '성남', sport: 'football', logoUrl: 'https://i.namu.wiki/i/oyM9aIG2LT7ffPZQzbvatS2s_X5KZsxuL4Fi_sxlMkSsIy9ryHkINlNlbivGVYNqzqJQT633ljiXisWU9Mn_Uatrx38P2TpMMEz7VospkcFEwLelGK95Cq-1yimEi8uEWslpsGhXp8m4BZLMDvd6Rg.svg' },
  suwonSamsung: { id: 'suwonSamsung', name: '수원 삼성 블루윙즈', shortName: '수원삼성', sport: 'football', logoUrl: 'https://i.namu.wiki/i/r2fAQubZGJSSW1K1rMqj0CjMAvbxLr2IkEMeEIu3mtfDT-6_tR6dRDdf4n5ztvQbCtXPFyb0rE6nkOhFs0pxrRpbYgWprp4Gj69u5yb-LIwmX94dQ_XAhvpLiJQCx_BGzQb_HLdMIGCZJclTz0E36w.svg' },
  suwonfc: { id: 'suwonfc', name: '수원 FC', shortName: '수원FC', sport: 'football' , logoUrl: 'https://i.namu.wiki/i/_KU8NRTYHntll8JXUu4U7K4DAccckOHUO86H5hncv8vT0Dwh3DmcqAYmTP7tZr-3IUvRdm_Qt4zbbWPTAEVd8A.svg'},
  ansan: { id: 'ansan', name: '안산 그리너스 FC', shortName: '안산', sport: 'football', logoUrl: 'https://i.namu.wiki/i/Dk2sUBW5_PEc2LwHfv0m-YLTYLCEw8AcBBE2gu2KXZwz_A3fKmwDvu5xGwexOUVWxxjJrmWER5VKCaIIf22nGGMRlPkCj1dobix8LN9pAguzuJvoTFkyzklS7vjAHAimCRQ8QiNg60tdU-ux_Rq4ng.svg' },
  yongin: { id: 'yongin', name: '용인 FC', shortName: '용인', sport: 'football', logoUrl: 'https://i.namu.wiki/i/G1YURpLsei4MPAHkRZuZQ-Rs6OX4BbvWm5Iqywtyf9F3cfiyoglF7VKOhrlf18Cr3y7PstVGzrCaNypvyQ3YmBjjF12LJztF3rhynFU25h2PuB26HbZhXHGD_CyT1UU9h9mNgIbOE5pySfUYaSxniA.svg' },
  jeonnam: { id: 'jeonnam', name: '전남 드래곤즈', shortName: '전남', sport: 'football' , logoUrl: 'https://i.namu.wiki/i/xNqnSBGKuT5VoNCEJr8f6eykj9lC9Whc1FYay5RD3nLDjCgiyN77PhoTmPB3U-9dlQJBFk2C5u5QvuLR7JGjWoDvN_XeNdGoRVfGUS2OxK1wEL0xpZjeqoDUS-AyW4TKmPcFahGT0veInsdiXWHEHw.svg'},
  chungnamAsan: { id: 'chungnamAsan', name: '충남 아산 FC', shortName: '충남아산', sport: 'football', logoUrl: 'https://i.namu.wiki/i/Z_1PUzfDEeTFbpKk215f4GTo_7x9LPE1I1YN22HOlUBAgSUeerOs1r9itfI6AyJLSKP1LmSwUk4Zemzr1BQ1z6i2sFmvsUeN0d--GISIM9sT0cVt3VTl5HOmoLeteLYMJyofGkl7bFAiOHCFrBfApA.svg' },
  chungbukCheongju: { id: 'chungbukCheongju', name: '충북 청주 FC', shortName: '충북청주', sport: 'football', logoUrl: 'https://i.namu.wiki/i/xNqCp_GbZPiPSTqI-g8lgfCcf7zkWgv4csCbCv7_UM_cmPsi-e_SVOqzsTz6WSbQXn6VANH6FvuMXbVMO3e7YoLe2VFwzT6sslsjGrzBentvw-QYq_IdFnEB8N68UJvfgFeOPdEwlMkYcFH7pouUJQ.svg' },
  cheonanCity: { id: 'cheonanCity', name: '천안 시티 FC', shortName: '천안', sport: 'football', logoUrl: 'https://i.namu.wiki/i/4UqX57LegJXcWMu2_56XI6NGK-Uw9KcCmeOayREjUynjSE5cliqJ7H6cBrSMpdO_bUgHuQeI-0rLLKOnGV8RV3MZWYNzJkQ4CS-47r7ntkYG9meAWn279cqFWnyaNC_JFKcZAUJzmp7Z7gI_Hw8hUA.svg' },
  paju: { id: 'paju', name: '파주 프런티어 FC', shortName: '파주', sport: 'football', logoUrl: 'https://i.namu.wiki/i/HQ1ckf7pjHrhqA86wh7NQtBZrcy6dDmg8J49hHR4SNwe1uB9qT6sX9AiTevlKh-ggR39Z_a2LpE7qT3YUD0N5PLpmMRIjwRjEvZzEuXGw_gZNii4-uGNIF59CsNU7SD0crr5TU7N0s0TCfIiRPX8Nw.svg' },
  hwaseong: { id: 'hwaseong', name: '화성 FC', shortName: '화성', sport: 'football', logoUrl: 'https://i.namu.wiki/i/YtuMwFcvHg9tJy2xpOcyuw5ELPkXZdhNQTmezDXNHCcwN6u_x6LEQ3EhgQvcFQQA0fZLIyd2OrLbRsgUFhHvPlGSov5-FHzYJFoBUKa0vWxFVWEOxU1gfsbs277giPCcaH0anWrnl7sV7CKUWkOFjg.svg' },

  tigers: { id: 'tigers', name: '한신 타이거스', shortName: '한신', sport: 'baseball', logoUrl: 'https://i.namu.wiki/i/1CpOzorAgJXKVkUkI9xcKsGzNbGAiiZuucWg3ShVrKn47NIK1ZV57YMLHdfFxZWoWmmJb9DrHCNcwIar62qUXA.svg' },
  baystars: { id: 'baystars', name: '요코하마 DeNA 베이스타즈', shortName: '요코하마', sport: 'baseball', logoUrl: 'https://i.namu.wiki/i/bsEKtK0NW5gN-k97tyq16v_wIT3wkVjJ6VG9fLYXYaL-h6_zgtB8OY9K8_N5JZNUgAdMP1HVaXmTv66PZBsaqiWboePTpTohz5M8AWVh1DTH13Og7hBvVSXzkIuARcDgA1AktZwBONpWhblchghyjQ.svg' },
  giants: { id: 'giants', name: '요미우리 자이언츠', shortName: '요미우리', sport: 'baseball' , logoUrl: 'https://i.namu.wiki/i/UZupkK0zXiJa5mZrgYqKUCttj0iSz8nEdfBfvqMVq3npHFaP_Nl1FhNeWexScM_UtiveANzqAOOtPfyc99HNyNnCPBrQuQDnJrUCd4--lEvDmJERM8ZixaSP3QVhlMbfXL6oTqiWNCaxjcu2NzH4ZA.svg'},
  dragons: { id: 'dragons', name: '주니치 드래곤즈', shortName: '주니치', sport: 'baseball', logoUrl: 'https://i.namu.wiki/i/FY_kNXGo5GL2sKqIbWnHSTbd0Z1tMEHCU1BEFN5L_v9yMFhaTzcd358gV8epHUq8p8ld6b72WBpzuCHMOIOMvmKwbcAyzQp4TN3dHgpQtz-qyjl6PxP5BoybupqA4uQag-92QagJ6jr-AJ-xTLKubw.svg' },
  carp: { id: 'carp', name: '히로시마 도요 카프', shortName: '히로시마', sport: 'baseball', logoUrl: 'https://i.namu.wiki/i/MQSq89VY_cxv6K0uJDil3UMSkQGJ0ASG76kHO5wIS1aGpzOKIHHru3c9uhbGbOpfpLpQb5WYwXvL1mJQ45hUT1yiCdZfZT2ffqTDARGPSBKcu8M0yYPGMkI_WIOXQ6sa769lwWtHgr1-vmVgXiznDA.svg' },
  swallows: { id: 'swallows', name: '도쿄 야쿠르트 스왈로즈', shortName: '야쿠르트', sport: 'baseball' , logoUrl: 'https://i.namu.wiki/i/JevhiQplIUmg0olXb2Fj4l5GIAdTAW6kZm6ygecS4QfIT92p-eyZr0gF46gdXRm_sUl7JfF48UbEfVbTx7m_kQ.svg'},
  hawks: { id: 'hawks', name: '후쿠오카 소프트뱅크 호크스', shortName: '소프트뱅크', sport: 'baseball' , logoUrl: 'https://i.namu.wiki/i/1iv1ezl3pfmV12HYsHNTqsQZq4AyF7QD3Mz4IlS2MBV11yJsjopCCwN4aZ2rYqgrWQYS-bYlSQCDh3t66nw3RA.svg'},
  fighters: { id: 'fighters', name: '홋카이도 닛폰햄 파이터즈', shortName: '닛폰햄', sport: 'baseball', logoUrl: 'https://i.namu.wiki/i/A1nCRJPRyG7YiU3PUUe0Hr9qM0LY8KNXNyQRmszqGhq_aXO8LOz2uaXqD7VmET1KrXqyJxc28fWQ9B1Sn74X80nw_kozGt-Fz2ot_X-5sB1SFbZLSUXMZVpgKab5S89zXInVgdm2766qmzeb5ehW_A.svg' },
  buffaloes: { id: 'buffaloes', name: '오릭스 버팔로즈', shortName: '오릭스', sport: 'baseball' , logoUrl: 'https://i.namu.wiki/i/1ZdJsdCbFkwTWwxtN04gyK036qYC6IsRhC7djrwbfKW-VTv2_dHxdUlUxtTjQ-OuvkH-eQyvNDcYP1M280laCANQlh-O7gIQYxqM6BvnxvyPDLiBaCK98VWH9_Sq21vnQjDY0O8mgWh9iMhMiyjPeA.svg'},
  eagles: { id: 'eagles', name: '도호쿠 라쿠텐 골든이글스', shortName: '라쿠텐', sport: 'baseball', logoUrl: 'https://i.namu.wiki/i/QWVktHiwuTaLs6OjkCux3UtFv6AEPqIxTItYUDbJk-1Xu0Kck2MoicDA3uyxVHWBOk3BnruE0UowhLKrQzB0WhzAeMbhZLKVFCLKCo3BrTXd2kdCHMDoUYrF_B0rDOVNf1Pt8q3yGeiWAuXJtKwYkw.svg' },
  lions: { id: 'lions', name: '사이타마 세이부 라이온즈', shortName: '세이부', sport: 'baseball', logoUrl: 'https://i.namu.wiki/i/ckEYPk0AvIWtOnKXXzQ6KIfJdOQZfCK4UuFLVc8Nqc6BK04LZbLAeExYPqDJu1ZuUoTW-GOXYMxKLs67Vbfonw.svg' },
  marines: { id: 'marines', name: '치바 롯데 마린즈', shortName: '지바롯데', sport: 'baseball' , logoUrl: 'https://i.namu.wiki/i/4E--zAXLRcDBn9DgOnxV2NZuotCZdoQ_BEZZY296bhFh6KQwRNP9Kn9ahSMMc0wMmLnHSb3J5wAPDQY_ku0aIg.svg'},

  reds: { id: 'reds', name: '우라와 레즈', shortName: '우라와', sport: 'football' , logoUrl: 'https://i.namu.wiki/i/LoA0ZroRYN-YPAFpexdNtzpOSUSOeXarEB7j0VYrJfcUmiaMXgBAgwcQFF_f_oYG9YqjD-uxTLrPbpdYM_me9bjgXcKknewKkcXjIg5ByUHai3X0FQpJ3ToEQQwoUkv0Go_7YKI8qdBbRPHScmuTow.svg'},
  fctokyo: { id: 'fctokyo', name: 'FC 도쿄', shortName: 'FC도쿄', sport: 'football' , logoUrl: 'https://i.namu.wiki/i/LoA0ZroRYN-YPAFpexdNtzpOSUSOeXarEB7j0VYrJfcUmiaMXgBAgwcQFF_f_oYG9YqjD-uxTLrPbpdYM_me9bjgXcKknewKkcXjIg5ByUHai3X0FQpJ3ToEQQwoUkv0Go_7YKI8qdBbRPHScmuTow.svg'},
  yokohama: { id: 'yokohama', name: '요코하마 F. 마리노스', shortName: '요코하마FM', sport: 'football' , logoUrl: 'https://i.namu.wiki/i/LoA0ZroRYN-YPAFpexdNtzpOSUSOeXarEB7j0VYrJfcUmiaMXgBAgwcQFF_f_oYG9YqjD-uxTLrPbpdYM_me9bjgXcKknewKkcXjIg5ByUHai3X0FQpJ3ToEQQwoUkv0Go_7YKI8qdBbRPHScmuTow.svg'},
  gamba: { id: 'gamba', name: '감바 오사카', shortName: '감바', sport: 'football' , logoUrl: 'https://i.namu.wiki/i/LoA0ZroRYN-YPAFpexdNtzpOSUSOeXarEB7j0VYrJfcUmiaMXgBAgwcQFF_f_oYG9YqjD-uxTLrPbpdYM_me9bjgXcKknewKkcXjIg5ByUHai3X0FQpJ3ToEQQwoUkv0Go_7YKI8qdBbRPHScmuTow.svg'},
  vegalta: { id: 'vegalta', name: '베갈타 센다이', shortName: '센다이', sport: 'football' , logoUrl: 'https://i.namu.wiki/i/LoA0ZroRYN-YPAFpexdNtzpOSUSOeXarEB7j0VYrJfcUmiaMXgBAgwcQFF_f_oYG9YqjD-uxTLrPbpdYM_me9bjgXcKknewKkcXjIg5ByUHai3X0FQpJ3ToEQQwoUkv0Go_7YKI8qdBbRPHScmuTow.svg'},
  iwata: { id: 'iwata', name: '주빌로 이와타', shortName: '이와타', sport: 'football', logoUrl: 'https://i.namu.wiki/i/LoA0ZroRYN-YPAFpexdNtzpOSUSOeXarEB7j0VYrJfcUmiaMXgBAgwcQFF_f_oYG9YqjD-uxTLrPbpdYM_me9bjgXcKknewKkcXjIg5ByUHai3X0FQpJ3ToEQQwoUkv0Go_7YKI8qdBbRPHScmuTow.svg' }
};

const stadiums: Record<string, Stadium> = {
  jamsil: { id: 'jamsil', name: '잠실야구장', city: '서울', country: 'KR', lat: 37.51213, lng: 127.0710 },
  gocheok: { id: 'gocheok', name: '고척스카이돔', city: '서울', country: 'KR', lat: 37.49821, lng: 126.86709 },
  seoulWorldCup: { id: 'seoulWorldCup', name: '서울월드컵경기장', city: '서울', country: 'KR', lat: 37.56826, lng: 126.89724 },
  suwonBaseball: { id: 'suwonBaseball', name: '수원KT위즈파크', city: '수원', country: 'KR', lat: 37.29997, lng: 127.00976 },
  suwonSports: { id: 'suwonSports', name: '수원종합운동장', city: '수원', country: 'KR', lat: 37.29906, lng: 127.00957 },
  daeguPark: { id: 'daeguPark', name: '대구삼성라이온즈파크', city: '대구', country: 'KR', lat: 35.84199, lng: 128.68174 },
  dgbPark: { id: 'dgbPark', name: 'DGB대구은행파크', city: '대구', country: 'KR', lat: 35.88098, lng: 128.58989 },
  daejeonBaseball: { id: 'daejeonBaseball', name: '대전한화생명볼파크', city: '대전', country: 'KR', lat: 36.3171, lng: 127.4291 },
  busanAsiad: { id: 'busanAsiad', name: '부산아시아드주경기장', city: '부산', country: 'KR', lat: 35.19096, lng: 129.06026 },
  sajik: { id: 'sajik', name: '사직야구장', city: '부산', country: 'KR', lat: 35.19447, lng: 129.06153 },
  gwangjuChamp: { id: 'gwangjuChamp', name: '광주기아챔피언스필드', city: '광주', country: 'KR', lat: 35.16815, lng: 126.88888 },
  anyangStadium: { id: 'anyangStadium', name: '안양종합운동장', city: '안양', country: 'KR', lat: 37.40565, lng: 126.95373 },
  mokdong: { id: 'mokdong', name: '목동종합운동장', city: '서울', country: 'KR', lat: 37.53023, lng: 126.88154 },
  dgbank: { id: 'dgbank', name: '전주월드컵경기장', city: '전주', country: 'KR', lat: 35.86823, lng: 127.06476 },
  steelYard: { id: 'steelYard', name: '포항스틸야드', city: '포항', country: 'KR', lat: 36.0072, lng: 129.3634 },
  gangneungComplex: { id: 'gangneungComplex', name: '강릉종합운동장', city: '강릉', country: 'KR', lat: 37.7736, lng: 128.8997 },
  gwangjuFootballStadium: { id: 'gwangjuFootballStadium', name: '광주축구전용구장', city: '광주', country: 'KR', lat: 35.1601, lng: 126.8762 },
  gimcheonSportsComplex: { id: 'gimcheonSportsComplex', name: '김천종합운동장', city: '김천', country: 'KR', lat: 36.1399, lng: 128.1136 },
  daejeonWorldCup: { id: 'daejeonWorldCup', name: '대전월드컵경기장', city: '대전', country: 'KR', lat: 36.366, lng: 127.3244 },
  incheonFootballStadium: { id: 'incheonFootballStadium', name: '인천축구전용경기장', city: '인천', country: 'KR', lat: 37.4661, lng: 126.6431 },
  jejuWorldCup: { id: 'jejuWorldCup', name: '제주월드컵경기장', city: '서귀포', country: 'KR', lat: 33.2461, lng: 126.5092 },
  changwonFootballCenter: { id: 'changwonFootballCenter', name: '창원축구센터', city: '창원', country: 'KR', lat: 35.2222, lng: 128.5806 },
  gimpoSalter: { id: 'gimpoSalter', name: '김포솔터축구장', city: '김포', country: 'KR', lat: 37.6423, lng: 126.6768 },
  gimhaeSports: { id: 'gimhaeSports', name: '김해종합운동장', city: '김해', country: 'KR', lat: 35.2273, lng: 128.8894 },
  tancheon: { id: 'tancheon', name: '탄천종합운동장', city: '성남', country: 'KR', lat: 37.4101, lng: 127.1294 },
  suwonWorldCup: { id: 'suwonWorldCup', name: '수원월드컵경기장', city: '수원', country: 'KR', lat: 37.2868, lng: 127.0369 },
  ansanWa: { id: 'ansanWa', name: '안산 와~스타디움', city: '안산', country: 'KR', lat: 37.3214, lng: 126.8307 },
  yonginMireu: { id: 'yonginMireu', name: '용인미르스타디움', city: '용인', country: 'KR', lat: 37.1459, lng: 127.1776 },
  gwangyangFootball: { id: 'gwangyangFootball', name: '광양축구전용구장', city: '광양', country: 'KR', lat: 34.9405, lng: 127.6958 },
  yiSunShin: { id: 'yiSunShin', name: '이순신종합운동장', city: '아산', country: 'KR', lat: 36.7698, lng: 127.0155 },
  cheongjuStadium: { id: 'cheongjuStadium', name: '청주종합경기장', city: '청주', country: 'KR', lat: 36.6375, lng: 127.4895 },
  cheonanStadium: { id: 'cheonanStadium', name: '천안종합운동장', city: '천안', country: 'KR', lat: 36.7799, lng: 127.1094 },
  pajuStadium: { id: 'pajuStadium', name: '파주스타디움', city: '파주', country: 'KR', lat: 37.8157, lng: 126.7926 },
  hwaseongSports: { id: 'hwaseongSports', name: '화성종합경기타운', city: '화성', country: 'KR', lat: 37.1997, lng: 126.8311 },

  tokyoDome: { id: 'tokyoDome', name: '도쿄돔', city: '도쿄', country: 'JP', lat: 35.70564, lng: 139.75189 },
  jingu: { id: 'jingu', name: '메이지진구야구장', city: '도쿄', country: 'JP', lat: 35.67452, lng: 139.71703 },
  ajinomoto: { id: 'ajinomoto', name: '아지노모토 스타디움', city: '도쿄', country: 'JP', lat: 35.66438, lng: 139.52723 },
  saitama: { id: 'saitama', name: '사이타마 스타디움 2002', city: '사이타마', country: 'JP', lat: 35.9032, lng: 139.71758 },
  escon: { id: 'escon', name: '에스콘필드 홋카이도', city: '삿포로', country: 'JP', lat: 43.0145, lng: 141.5633 },
  nissan: { id: 'nissan', name: '닛산 스타디움', city: '요코하마', country: 'JP', lat: 35.51002, lng: 139.60698 },
  marine: { id: 'marine', name: 'ZOZO 마린 스타디움', city: '지바', country: 'JP', lat: 35.64547, lng: 140.03073 },
  paypay: { id: 'paypay', name: '미즈호 PayPay 돔', city: '후쿠오카', country: 'JP', lat: 33.5953, lng: 130.362 },
  panasonic: { id: 'panasonic', name: '파나소닉 스타디움 스이타', city: '오사카', country: 'JP', lat: 34.80549, lng: 135.54108 },
  yurtec: { id: 'yurtec', name: '유아텍 스타디움 센다이', city: '센다이', country: 'JP', lat: 38.32319, lng: 140.88161 },
  ecopa: { id: 'ecopa', name: '시즈오카 스타디움 에코파', city: '시즈오카', country: 'JP', lat: 34.7457, lng: 137.9694 },
  kyocera: { id: 'kyocera', name: '교세라 돔 오사카', city: '오사카', country: 'JP', lat: 34.66935, lng: 135.47601 }
};

const baseGames: Game[] = [
  { id: 'kr-1', date: '2026-03-01', time: '14:00', league: 'KBO', sport: 'baseball', homeTeam: teams.lg, awayTeam: teams.doosan, stadium: stadiums.jamsil },
  { id: 'kr-2', date: '2026-03-01', time: '14:00', league: 'KBO', sport: 'baseball', homeTeam: teams.kiwoom, awayTeam: teams.ssg, stadium: stadiums.gocheok },
  { id: 'kr-3', date: '2026-03-01', time: '16:30', league: 'KLEAGUE1', sport: 'football', homeTeam: teams.seoul, awayTeam: teams.ulsan, stadium: stadiums.seoulWorldCup },
  { id: 'kr-4', date: '2026-03-01', time: '16:30', league: 'KLEAGUE1', sport: 'football', homeTeam: teams.suwonfc, awayTeam: teams.daegu, stadium: stadiums.suwonSports },
  { id: 'kr-5', date: '2026-03-02', time: '18:30', league: 'KBO', sport: 'baseball', homeTeam: teams.hanwha, awayTeam: teams.samsung, stadium: stadiums.daejeonBaseball },
  { id: 'kr-6', date: '2026-03-02', time: '19:00', league: 'KBO', sport: 'baseball', homeTeam: teams.lotte, awayTeam: teams.kia, stadium: stadiums.sajik },
  { id: 'kr-7', date: '2026-03-02', time: '19:30', league: 'KLEAGUE1', sport: 'football', homeTeam: teams.jeonbuk, awayTeam: teams.pohang, stadium: stadiums.dgbank },
  { id: 'kr-8', date: '2026-03-02', time: '19:30', league: 'KLEAGUE2', sport: 'football', homeTeam: teams.busan, awayTeam: teams.jeonnam, stadium: stadiums.busanAsiad },
  { id: 'kr-9', date: '2026-03-03', time: '14:00', league: 'KBO', sport: 'baseball', homeTeam: teams.kia, awayTeam: teams.samsung, stadium: stadiums.gwangjuChamp },
  { id: 'kr-10', date: '2026-03-03', time: '16:30', league: 'KLEAGUE2', sport: 'football', homeTeam: teams.anyang, awayTeam: teams.seoulE, stadium: stadiums.anyangStadium },
  { id: 'kr-11', date: '2026-03-03', time: '18:00', league: 'KLEAGUE1', sport: 'football', homeTeam: teams.daegu, awayTeam: teams.suwonfc, stadium: stadiums.dgbPark },

  { id: 'jp-1', date: '2026-03-01', time: '14:00', league: 'NPB', sport: 'baseball', homeTeam: teams.giants, awayTeam: teams.swallows, stadium: stadiums.tokyoDome },
  { id: 'jp-2', date: '2026-03-01', time: '15:00', league: 'J1', sport: 'football', homeTeam: teams.fctokyo, awayTeam: teams.yokohama, stadium: stadiums.ajinomoto },
  { id: 'jp-3', date: '2026-03-02', time: '18:00', league: 'NPB', sport: 'baseball', homeTeam: teams.hawks, awayTeam: teams.buffaloes, stadium: stadiums.paypay },
  { id: 'jp-4', date: '2026-03-02', time: '19:00', league: 'J1', sport: 'football', homeTeam: teams.gamba, awayTeam: teams.reds, stadium: stadiums.panasonic },
  { id: 'jp-5', date: '2026-03-03', time: '14:00', league: 'NPB', sport: 'baseball', homeTeam: teams.marines, awayTeam: teams.giants, stadium: stadiums.marine },
  { id: 'jp-6', date: '2026-03-03', time: '16:00', league: 'J2', sport: 'football', homeTeam: teams.vegalta, awayTeam: teams.iwata, stadium: stadiums.yurtec },
  { id: 'jp-7', date: '2026-03-03', time: '19:00', league: 'J1', sport: 'football', homeTeam: teams.reds, awayTeam: teams.fctokyo, stadium: stadiums.saitama }
];

const marchFridayToMondayDates = [
  '2026-03-01',
  '2026-03-02',
  '2026-03-06',
  '2026-03-07',
  '2026-03-08',
  '2026-03-09',
  '2026-03-13',
  '2026-03-14',
  '2026-03-15',
  '2026-03-16',
  '2026-03-20',
  '2026-03-21',
  '2026-03-22',
  '2026-03-23',
  '2026-03-27',
  '2026-03-28',
  '2026-03-29',
  '2026-03-30'
] as const;

const sampleSchedules: Record<string, Array<{ time: string; homeTeam: Team; awayTeam: Team; stadium: Stadium; sport: Game['sport'] }>> = {
  KBO: [
    { time: '14:00', homeTeam: teams.lg, awayTeam: teams.doosan, stadium: stadiums.jamsil, sport: 'baseball' },
    { time: '14:00', homeTeam: teams.kiwoom, awayTeam: teams.ssg, stadium: stadiums.gocheok, sport: 'baseball' },
    { time: '18:30', homeTeam: teams.hanwha, awayTeam: teams.samsung, stadium: stadiums.daejeonBaseball, sport: 'baseball' }
  ],
  KLEAGUE1: [
    { time: '16:30', homeTeam: teams.seoul, awayTeam: teams.ulsan, stadium: stadiums.seoulWorldCup, sport: 'football' },
    { time: '19:30', homeTeam: teams.jeonbuk, awayTeam: teams.pohang, stadium: stadiums.dgbank, sport: 'football' },
    { time: '16:30', homeTeam: teams.gwangju, awayTeam: teams.gangwon, stadium: stadiums.gwangjuFootballStadium, sport: 'football' }
  ],
  KLEAGUE2: [
    { time: '16:30', homeTeam: teams.anyang, awayTeam: teams.seoulE, stadium: stadiums.anyangStadium, sport: 'football' },
    { time: '19:30', homeTeam: teams.busan, awayTeam: teams.jeonnam, stadium: stadiums.busanAsiad, sport: 'football' },
    { time: '16:30', homeTeam: teams.gimpo, awayTeam: teams.chungnamAsan, stadium: stadiums.gimpoSalter, sport: 'football' }
  ],
  NPB: [
    { time: '14:00', homeTeam: teams.giants, awayTeam: teams.swallows, stadium: stadiums.tokyoDome, sport: 'baseball' },
    { time: '18:00', homeTeam: teams.hawks, awayTeam: teams.buffaloes, stadium: stadiums.paypay, sport: 'baseball' },
    { time: '18:00', homeTeam: teams.swallows, awayTeam: teams.marines, stadium: stadiums.jingu, sport: 'baseball' }
  ],
  J1: [
    { time: '15:00', homeTeam: teams.fctokyo, awayTeam: teams.yokohama, stadium: stadiums.ajinomoto, sport: 'football' },
    { time: '19:00', homeTeam: teams.gamba, awayTeam: teams.reds, stadium: stadiums.panasonic, sport: 'football' },
    { time: '19:00', homeTeam: teams.reds, awayTeam: teams.fctokyo, stadium: stadiums.saitama, sport: 'football' }
  ],
  J2: [
    { time: '16:00', homeTeam: teams.vegalta, awayTeam: teams.iwata, stadium: stadiums.yurtec, sport: 'football' },
    { time: '14:00', homeTeam: teams.iwata, awayTeam: teams.vegalta, stadium: stadiums.ecopa, sport: 'football' },
    { time: '18:00', homeTeam: teams.vegalta, awayTeam: teams.iwata, stadium: stadiums.yurtec, sport: 'football' }
  ]
};

const generatedMarchGames: Game[] = marchFridayToMondayDates.flatMap((date) =>
  Object.entries(sampleSchedules).flatMap(([league, fixtures]) =>
    fixtures.map((fixture, index) => ({
      id: `sample-${league.toLowerCase()}-${date}-${index + 1}`,
      date,
      time: fixture.time,
      league: league as Game['league'],
      sport: fixture.sport,
      homeTeam: fixture.homeTeam,
      awayTeam: fixture.awayTeam,
      stadium: fixture.stadium
    }))
  )
);

export const games: Game[] = [...baseGames, ...generatedMarchGames];

export function getMetroStadiums(country: 'KR' | 'JP', city: string): Stadium[] {
  return Object.values(stadiums).filter((stadium) => stadium.country === country && stadium.city === city);
}

