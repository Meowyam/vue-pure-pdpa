module Test.Main where

import Prelude
import Effect (Effect)
import Effect.Class.Console (log)
import Effect.Aff (launchAff_)
import Test.Spec.Reporter.Console (consoleReporter)
import Test.Spec.Runner (runSpec)

import Test.IndexTest (spec) as IndexTest

main :: Effect Unit
main = do
  log "🍝"
  launchAff_ $ runSpec [consoleReporter] do
    IndexTest.spec
-- https://purescript-spec.github.io/purescript-spec/