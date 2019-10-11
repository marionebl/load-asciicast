(defproject loadasciicast "2.0.0"
  :description "load asciinema asciicast data"
  :url "https://github.com/marionebl/load-asciicast"
  :license {:name "MIT"
            :url "https://opensource.org/licenses/MIT"}

  :dependencies [[org.clojure/clojure "1.10.1"]
                 [org.clojure/clojurescript "1.10.520"]
                 [org.clojure/core.match "0.3.0"]
                 [prismatic/schema "1.1.12"]]

  :plugins [[lein-cljsbuild "1.1.7"]]

  :min-lein-version "2.5.3"

  :clean-targets ^{:protect false} ["lib"]

  :source-paths ["src" "asciinema-player/src", "vt/src"]
  :resource-paths ["vt/resources"]

  :cljsbuild {:builds {
                       :release {:source-paths ["src"]
                                 :compiler {:main "loadasciicast.load"
                                            :output-to "index.js"
                                            :closure-defines {goog.DEBUG false}
                                            :foreign-libs [{:file "codepoint-polyfill.js"
                                                        :provides ["asciinema.vt.codepoint-polyfill"]}]
                                            :optimizations :simple
                                            :elide-asserts true
                                            :pretty-print  false}}}})
