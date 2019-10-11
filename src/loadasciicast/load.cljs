(ns loadasciicast.load
  (:require [asciinema.player.asciicast :as asciicast]
            [asciinema.player.frames :as frames]))

(defn cast-at-fps [cast fps]
  (let [frames       (get cast :frames)
        limit-frames (frames/at-hz fps #(identity %2) frames)]
    (assoc cast :frames limit-frames)))

(defn jsload [thing options]
  (let [opt        (or options {})
        width      (aget opt "width")
        height     (aget opt "height")
        idle       (aget opt "idle")
        fps        (aget opt "fps")
        cast       (asciicast/load thing width height idle)
        limit-cast (if (> fps 0) (cast-at-fps cast fps) cast)]
    (clj->js limit-cast)))

(defn -main []
  ())

(set! *main-cli-fn* -main)

(set! (.-exports js/module) (clj->js {
  :load jsload
}))
