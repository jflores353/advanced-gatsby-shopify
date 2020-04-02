import React, { useContext } from "react"
import { animated, useTransition } from "react-spring"
import { StoreContext } from "../Context/StoreContext"

const Loader = () => {
  const { isLoading } = useContext(StoreContext)
  // const isLoading = true

  const transitions = useTransition(isLoading, null, {
    from: { transform: "translate3d(100%, 0, 0)" },
    enter: { transform: "translate3d(0, 0, 0)" },
    leave: { transform: "translate3d(100%, 0, 0)" },
  })

  return transitions.map(
    ({ item, key, props }) =>
      item && (
        <animated.div
          key={key}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 100,
            background: "var(--blue)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            ...props,
          }}
        >
          <svg
            width="120"
            height="120"
            viewBox="0 0 58 58"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="none" fill-rule="evenodd">
              <g
                transform="translate(2 1)"
                stroke="var(--lightGreen)"
                stroke-width="1.5"
              >
                <circle
                  cx="42.601"
                  cy="11.462"
                  r="5"
                  fill-opacity="1"
                  fill="var(--gray)"
                >
                  <animate
                    attributeName="fill-opacity"
                    begin="0s"
                    dur="1.3s"
                    values="1;0;0;0;0;0;0;0"
                    calcMode="linear"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle
                  cx="49.063"
                  cy="27.063"
                  r="5"
                  fill-opacity="0"
                  fill="#fff"
                >
                  <animate
                    attributeName="fill-opacity"
                    begin="0s"
                    dur="1.3s"
                    values="0;1;0;0;0;0;0;0"
                    calcMode="linear"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle
                  cx="42.601"
                  cy="42.663"
                  r="5"
                  fill-opacity="0"
                  fill="#fff"
                >
                  <animate
                    attributeName="fill-opacity"
                    begin="0s"
                    dur="1.3s"
                    values="0;0;1;0;0;0;0;0"
                    calcMode="linear"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="27" cy="49.125" r="5" fill-opacity="0" fill="#fff">
                  <animate
                    attributeName="fill-opacity"
                    begin="0s"
                    dur="1.3s"
                    values="0;0;0;1;0;0;0;0"
                    calcMode="linear"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle
                  cx="11.399"
                  cy="42.663"
                  r="5"
                  fill-opacity="0"
                  fill="#fff"
                >
                  <animate
                    attributeName="fill-opacity"
                    begin="0s"
                    dur="1.3s"
                    values="0;0;0;0;1;0;0;0"
                    calcMode="linear"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle
                  cx="4.938"
                  cy="27.063"
                  r="5"
                  fill-opacity="0"
                  fill="#fff"
                >
                  <animate
                    attributeName="fill-opacity"
                    begin="0s"
                    dur="1.3s"
                    values="0;0;0;0;0;1;0;0"
                    calcMode="linear"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle
                  cx="11.399"
                  cy="11.462"
                  r="5"
                  fill-opacity="0"
                  fill="#fff"
                >
                  <animate
                    attributeName="fill-opacity"
                    begin="0s"
                    dur="1.3s"
                    values="0;0;0;0;0;0;1;0"
                    calcMode="linear"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="27" cy="5" r="5" fill-opacity="0" fill="#fff">
                  <animate
                    attributeName="fill-opacity"
                    begin="0s"
                    dur="1.3s"
                    values="0;0;0;0;0;0;0;1"
                    calcMode="linear"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            </g>
          </svg>
        </animated.div>
      )
  )
}

export default Loader
