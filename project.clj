(defproject loadasciicast "1.0.0"
  :description "load asciinema asciicast data"
  :url "https://github.com/marionebl/load-asciicast"
  :license {:name "MIT"
            :url "https://opensource.org/licenses/MIT"}

  :dependencies [[org.clojure/clojure "1.8.0"]
                 [org.clojure/clojurescript "1.9.671"]
                 [org.clojure/core.match "0.3.0-alpha4"]
                 [prismatic/schema "1.1.6"]]

  :plugins [[lein-cljsbuild "1.1.5"]]

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
