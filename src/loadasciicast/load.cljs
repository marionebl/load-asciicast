(ns loadasciicast.load
  (:require [asciinema.player.asciicast :as asciicast]))

(defn jsload [thing vt-width vt-height]
  (clj->js (asciicast/load thing vt-width vt-height)))

(defn -main []
  ())

(set! *main-cli-fn* -main)

(set! (.-exports js/module) (clj->js {
  :load jsload
}))
